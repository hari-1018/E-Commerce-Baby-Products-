import { useNavigate } from 'react-router-dom';
import { BsFillCartFill } from "react-icons/bs";
import { CartContext } from '../Context/CartContext'; 
import empty from '../assets/empty-shopping-cart.png';
import { useContext } from 'react';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePayNow = () => {
    const totalAmount = totalPrice();
    navigate('/payment', {
      state: { cartItems: cart, totalAmount },
    });
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 p-8">
        <img src={empty} alt="Empty Cart" className="w-72 h-60 mb-4" />
        <p className="text-center text-2xl font-bold text-gray-600">Oops..! Your cart is empty. 😓</p>
      </div>
    );
  }

  return (
    <div className="cart-container bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-36 mb-28">
      <h1 className="text-3xl font-bold text-indigo-600 flex items-center justify-center mb-8">
        Your Shopping Cart
        <BsFillCartFill className="ml-2 text-3xl" />
      </h1>

      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b-2 pb-4 mb-4">
          <div className="flex items-center gap-4">
            <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-md" />
            <div>
              <h2 className="text-base font-semibold text-indigo-600">{item.name}</h2>
              <p className="text-sm text-gray-600">⭐{item.stars}</p>
              <p className="text-sm text-gray-600">Price: ₹ {item.price}/-</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-red-500 text-white rounded-md">-</button>
            <p className="text-base font-semibold text-indigo-600">{item.quantity}</p>
            <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 bg-green-500 text-white rounded-md">+</button>
            <p className="text-base font-semibold text-indigo-600">₹{item.price * item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-base bg-transparent border border-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white">Remove</button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-2xl font-bold text-indigo-600">Total Items: {totalItems()}</h2>
        <h2 className="text-2xl font-bold text-indigo-600">Total: ₹{totalPrice()}/-</h2>
        
        <button onClick={handlePayNow} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-gradient-to-l hover:from-blue-500 hover:to-pink-500">Pay Now</button>
      </div>
    </div>
  );
};

export default Cart;