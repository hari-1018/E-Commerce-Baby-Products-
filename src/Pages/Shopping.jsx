import { useState, useEffect } from 'react';

const Shopping = ({ cartItems, removeFromCart, updateQuantity }) => {
  if (cartItems.length === 0) {
    return <p className="text-center text-lg text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="shopping-container bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-32 mb-24">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Shopping Bag</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b-2 py-4">
          <div className="flex items-center gap-4">
            <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <button className="text-blue-600 underline" onClick={() => console.log('Edit item')}>
                Edit
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow-md hover:bg-pink-600"
            >
              -
            </button>
            <span className="mx-4 text-xl font-bold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-600"
            >
              +
            </button>
          </div>

          <p className="text-xl font-bold text-gray-900">₹{item.price * item.quantity}</p>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 text-2xl font-bold hover:text-red-600"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Shopping;
