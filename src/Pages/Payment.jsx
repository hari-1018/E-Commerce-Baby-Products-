import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShippingFast } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { toast } from 'react-toastify';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalAmount = 0 } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [formErrors, setFormErrors] = useState({ paymentMethod: false, shippingAddress: false });
  const [isCartCleared, setIsCartCleared] = useState(false);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setSelectedBank(''); // Reset bank selection
    setFormErrors({ ...formErrors, paymentMethod: false });
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
    setFormErrors({ ...formErrors, shippingAddress: false });
  };

  const handleConfirmPayment = async () => {
    const paymentMethodValid = paymentMethod !== '';
    const shippingAddressValid = shippingAddress.trim() !== '';

    if (!paymentMethodValid || !shippingAddressValid) {
      setFormErrors({
        paymentMethod: !paymentMethodValid,
        shippingAddress: !shippingAddressValid
      });
      return;
    }

    toast.success('Thank you for your purchase😊. We’re thrilled to be part of your baby’s journey!');

    try {
      for (let item of cartItems) {
        await axios.delete(`http://localhost:5000/cart/${item.id}`); // Adjust your API endpoint if needed
      }
      setIsCartCleared(true);
    } catch (error) {
      console.error('Error clearing the cart:', error);
      toast.error('Something went wrong while clearing the cart.');
    }

    setPaymentMethod('');
    setShippingAddress('');
    setFormErrors({ paymentMethod: false, shippingAddress: false });
    setSelectedBank(''); // Reset bank selection after payment
  };

  if (isCartCleared) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Baby Buds</h1>
        <p className="text-xl text-indigo-600">No items remaining in your Cart. You can continue Shopping!</p>
        <button onClick={() => navigate('/shop')} className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-pink-600 transition">Go to Shop</button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Baby Buds</h1>
        <p className="text-xl">Your cart is empty.</p>
        <button onClick={() => navigate('/shop')} className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-pink-600 transition">Go to Shop</button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-pink-100 to-blue-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-28 mb-28">
      <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">Order Summary</h1>

      <ul className="mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between mb-4 border-b-2 pb-4">
            <div className="flex items-center gap-4">
              <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-md" />
              <div>
                <span className="text-md font-semibold text-indigo-600">{item.name} (x{item.quantity})</span>
              </div>
            </div>
            <span className="text-md font-semibold text-indigo-600 mt-5">₹{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="border-t-2 border-gray-300 mt-6 pt-4 flex justify-between text-xl font-bold">
        <span className="text-green-700">Total Amount:</span>
        <span className="text-green-700">₹{totalAmount.toFixed(2)}</span>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center">Shipping Address <FaShippingFast className='ml-2' /></h2>
        <textarea value={shippingAddress} onChange={handleShippingAddressChange} className={`block w-full p-2 border ${formErrors.shippingAddress ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-gray-700`} required></textarea>
        {formErrors.shippingAddress && <p className="text-red-500 text-sm mt-2">Please enter your shipping address.</p>}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center">Select Payment Method <BsCashCoin className='ml-2' /></h2>
        <select value={paymentMethod} onChange={handlePaymentMethodChange} className={`block w-full p-2 border ${formErrors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-gray-700`}>
          <option value="" disabled>Select a payment method</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Credit/Debit/ATM Card/EMI">Credit/Debit/ATM Card/EMI</option>
          <option value="EMI">EMI</option>
        </select>
        {formErrors.paymentMethod && <p className="text-red-500 text-sm mt-2">Please select a payment method.</p>}
      </div>

      {paymentMethod === "Bank Transfer" && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">Select Bank</h2>
          <select value={selectedBank} onChange={handleBankChange} className="block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700">
            <option value="" disabled>Select Your bank</option>
            <option value="Axis">Axis</option>
            <option value="Canara">Canara</option>
            <option value="Federal Bank">Federal Bank</option>
            <option value="HDFC">HDFC</option>
            <option value="ICICI">ICICI</option>
            <option value="KGB">KGB</option>
            <option value="Kotak">Kotak Mahindra Bank</option>
            <option value="SBI">SBI</option>
            <option value="SIB">South Indian Bank</option>
          </select>
        </div>
      )}

      <div className="text-center mt-8">
        <button onClick={handleConfirmPayment} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-gradient-to-l hover:from-blue-500 hover:to-pink-500">Confirm Payment</button>
      </div>
    </div>
  );
};

export default Payment;
