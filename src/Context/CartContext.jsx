import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

// export const useCart = () => {
//   const context = useContext(CartContext);
  
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const id = localStorage.getItem('id');

  // useEffect(() => {
  //   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  //   if (loggedInUser && loggedInUser.cart) {
  //     setCart(loggedInUser.cart);
  //   }
  // }, [id]);
  useEffect(() => {
    const handleLoginChange = () => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser && loggedInUser.cart) {
        setCart(loggedInUser.cart);
      }
    };

    // Add event listener
    window.addEventListener('loginChange', handleLoginChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('loginChange', handleLoginChange);
    };
  }, []);

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
    updateCartOnServer([]);
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
