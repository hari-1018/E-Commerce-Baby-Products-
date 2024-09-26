import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const handleLoginChange = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
        try {
          // Fetch cart from server when the user logs in
          const response = await axios.get(`http://localhost:5000/users/${loggedInUser.id}`);
          const serverCart = response.data.cart || [];

          // Merge existing cart with the fetched cart from the server
          setCart((prevCart) => {
            const mergedCart = [...prevCart];

            serverCart.forEach(serverItem => {
              const existingItem = mergedCart.find(item => item.id === serverItem.id);
              if (existingItem) {
                // Merge quantities if item exists in both carts
                existingItem.quantity += serverItem.quantity;
              } else {
                // Add new item from server cart
                mergedCart.push({ ...serverItem });
              }
            });

            return mergedCart;
          });
        } catch (err) {
          console.error('Error fetching cart from server', err);
        }
      } else {
        setCart([]); // Clear cart when no user is logged in
      }
    };

    window.addEventListener('loginChange', handleLoginChange);
    return () => {
      window.removeEventListener('loginChange', handleLoginChange);
    };
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateCartOnServer = async (cart) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      try {
        await axios.patch(`http://localhost:5000/users/${loggedInUser.id}`, { cart });

      } catch (err) {
        console.error('Error updating cart on server', err);
      }
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      updateCartOnServer(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      updateCartOnServer(updatedCart);
      return updatedCart;
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCartOnServer(updatedCart);
      return updatedCart;
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      updateCartOnServer(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]); 
    localStorage.removeItem('cart');
  };

  const totalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      increaseQuantity, 
      decreaseQuantity, 
      clearCart, 
      totalItems, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};
