import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GiShoppingBag } from "react-icons/gi";
import empty from '../assets/empty-shopping-cart.png'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        setCartItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart items', err);
        setError('An error occurred while fetching cart items. Please try again.');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handlePayNow = () => {
    navigate('/payment');
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error removing item', err);
      setError('Could not remove the item. Please try again.');
    }
  };

  const handleIncreaseQuantity = async (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    try {
      await axios.put(`http://localhost:5000/cart/${item.id}`, updatedItem);
      setCartItems(cartItems.map((cartItem) => (cartItem.id === item.id ? updatedItem : cartItem)));
    } catch (err) {
      console.error('Error updating quantity', err);
      setError('Could not update the quantity. Please try again.');
    }
  };

  const handleDecreaseQuantity = async (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      try {
        await axios.put(`http://localhost:5000/cart/${item.id}`, updatedItem);
        setCartItems(cartItems.map((cartItem) => (cartItem.id === item.id ? updatedItem : cartItem)));
      } catch (err) {
        console.error('Error updating quantity', err);
        setError('Could not update the quantity. Please try again.');
      }
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 p-8">
        <img
          src={empty}
          alt="Empty Cart"
          className="w-72 h-60  mb-4"
        />
        <p className="text-center text-2xl font-bold text-gray-600">Oops..!  Your cart is as empty. 😓</p>
      </div>
    );
  }

  return (
    <div className="cart-container bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-32 mb-24">
      <h1 className="text-center text-3xl font-bold text-indigo-600 mb-8">Shopping Bag <GiShoppingBag /></h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b-2 pb-4 mb-4">
          <div className="flex items-center gap-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-xl font-semibold text-indigo-600">{item.name}</h2>
              <p className="text-sm text-gray-600">⭐{item.stars}</p>
              <p className="text-sm text-gray-600">Price: ₹ {item.price}/-</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleDecreaseQuantity(item)}
              className="px-3 py-1 bg-red-500 text-white rounded-md"
            >
              -
            </button>
            <p className="text-xl font-semibold text-indigo-600">{item.quantity}</p>
            <button
              onClick={() => handleIncreaseQuantity(item)}
              className="px-3 py-1 bg-green-500 text-white rounded-md"
            >
              +
            </button>
            <p className="text-xl font-semibold text-indigo-600">₹{item.price * item.quantity}</p>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-2xl font-bold text-indigo-600">Total: ₹{totalPrice}</h2>
        <button
          onClick={handlePayNow}
          className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-gradient-to-l hover:from-blue-500 hover:to-pink-500"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
