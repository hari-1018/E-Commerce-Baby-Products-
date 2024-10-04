import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShippingFast } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { toast } from 'react-toastify'; 
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalAmount = 0 } = location.state || {};

  const userId = localStorage.getItem('id'); 

  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [district, setDistrict] = useState('');
  const [formErrors, setFormErrors] = useState({
    paymentMethod: false,
    shippingAddress: false,
    landmark: false,
    city: false,
    pincode: false,
    district: false
  });
  const [isCartCleared, setIsCartCleared] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPayment, setShowConfirmPayment] = useState(false); 

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setSelectedBank('');
    setFormErrors({ ...formErrors, paymentMethod: false });
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
    setFormErrors({ ...formErrors, shippingAddress: false });
  };

  const handleLandmarkChange = (e) => {
    setLandmark(e.target.value);
    setFormErrors({ ...formErrors, landmark: false });
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setFormErrors({ ...formErrors, city: false });
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setFormErrors({ ...formErrors, pincode: false });
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setFormErrors({ ...formErrors, district: false });
  };


  const openConfirmPayment = () => {
    setShowConfirmPayment(true);
  };


  const closeConfirmPayment = () => {
    setShowConfirmPayment(false);
  };

  const handleConfirmPaymentClick = () => {
    const paymentMethodValid = paymentMethod !== '';
    const shippingAddressValid = shippingAddress.trim() !== '';
    const landmarkValid = landmark.trim() !== '';
    const cityValid = city.trim() !== '';
    const pincodeValid = /^\d{6}$/.test(pincode);
    const districtValid = district !== '';

    if (!paymentMethodValid || !shippingAddressValid || !landmarkValid || !cityValid || !pincodeValid || !districtValid) {
      setFormErrors({
        paymentMethod: !paymentMethodValid,
        shippingAddress: !shippingAddressValid,
        landmark: !landmarkValid,
        city: !cityValid,
        pincode: !pincodeValid,
        district: !districtValid
      });
      toast.error('Please fill out all required fields correctly.');
      return;
    }
    openConfirmPayment();
  };

  const handlePaymentYes = async () => {
    closeConfirmPayment(); 
    setIsSubmitting(true); 

    try {
      if (!userId) {
        throw new Error('User ID is not defined. Please log in again.');
      }

      const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = userResponse.data;

      const newOrder = {
        id: uuidv4().slice(0, 8),
        cartItems,
        totalAmount,
        shippingAddress,
        landmark,
        city,
        pincode,
        district,
        paymentMethod,
        selectedBank: paymentMethod === "Bank Transfer" ? selectedBank : null,
        orderDate: new Date().toISOString()
      };

      const updatedOrders = userData.order ? [...userData.order, newOrder] : [newOrder];

      await axios.patch(`http://localhost:5000/users/${userId}`, {
        order: updatedOrders,
        cart: []
      });

      // toast.success('Success! Your payment is complete. Get ready for your delivery! ✨');
      toast.success(
        <div style={{ backgroundColor: '#ffe5b4', border: '1px solid #ffcc00', borderRadius:'8px', padding: '10px'}}>
          <span style={{ fontWeight: 'bold', color: 'black'}}>Success! Your payment is complete. Get ready for your delivery! ✨</span>
        </div>
      );

      setIsCartCleared(true);

      setPaymentMethod('');
      setShippingAddress('');
      setLandmark('');
      setCity('');
      setPincode('');
      setDistrict('');
      setFormErrors({
        paymentMethod: false,
        shippingAddress: false,
        landmark: false,
        city: false,
        pincode: false,
        district: false
      });
      setSelectedBank('');
    } catch (error) {
      console.error('Error processing the payment:', error.response ? error.response.data : error.message);
      toast.error('Something went wrong while processing your payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentCancel = () => {
    closeConfirmPayment();
  };

  if (isCartCleared) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Baby Buds</h1>
        <p className="text-xl text-indigo-600">You can continue Shopping!</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-pink-600 transition"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Baby Buds</h1>
        <p className="text-xl">Your cart is empty.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-pink-600 transition"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-pink-100 to-blue-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-28 mb-28">
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

      {/* Shipping Address Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center">
          Shipping Address <FaShippingFast className='ml-2' />
        </h2>
        <textarea
          value={shippingAddress}
          onChange={handleShippingAddressChange}
          className={`block w-full p-2 border ${formErrors.shippingAddress ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-gray-700`}
          placeholder="Enter your shipping address"
          required
        ></textarea>
        {formErrors.shippingAddress && <p className="text-red-500 text-sm mt-2">Please enter your shipping address.</p>}
      </div>

      {/* Landmark Field */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Landmark</h2>
        <input
          type="text"
          value={landmark}
          onChange={handleLandmarkChange}
          className={`block w-full p-2 border ${formErrors.landmark ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-gray-700`}
          placeholder="Enter landmark"
          required
        />
        {formErrors.landmark && <p className="text-red-500 text-sm mt-2">Please enter a landmark.</p>}
      </div>

      {/* City and Pincode Fields Side by Side */}
      <div className="mt-6 flex flex-col md:flex-row md:space-x-4">

        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">City</h2>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className={`block w-full p-2 border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-gray-700`}
            placeholder="Enter city"
            required
          />
          {formErrors.city && <p className="text-red-500 text-sm mt-2">Please enter a city.</p>}
        </div>

        {/* Pincode Field */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">Pincode</h2>
          <input
            type="text"
            value={pincode}
            onChange={handlePincodeChange}
            className={`block w-full p-2 border ${formErrors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-gray-700`}
            placeholder="Enter pincode"
            required
          />
          {formErrors.pincode && <p className="text-red-500 text-sm mt-2">Please enter a valid 6-digit pincode.</p>}
        </div>
      </div>

      {/* District Field */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">District</h2>
        <select
          value={district}
          onChange={handleDistrictChange}
          className={`block w-full p-2 border ${formErrors.district ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-gray-700`}
          required
        >
          <option value="" disabled>Select your district</option>
          <option value="Thiruvananthapuram">Thiruvananthapuram</option>
          <option value="Kollam">Kollam</option>
          <option value="Pathanamthitta">Pathanamthitta</option>
          <option value="Alappuzha">Alappuzha</option>
          <option value="Kottayam">Kottayam</option>
          <option value="Idukki">Idukki</option>
          <option value="Ernakulam">Ernakulam</option>
          <option value="Thrissur">Thrissur</option>
          <option value="Palakkad">Palakkad</option>
          <option value="Malappuram">Malappuram</option>
          <option value="Kozhikode">Kozhikode</option>
          <option value="Wayanad">Wayanad</option>
          <option value="Kannur">Kannur</option>
          <option value="Kasaragod">Kasaragod</option>
        </select>
        {formErrors.district && <p className="text-red-500 text-sm mt-2">Please select a district.</p>}
      </div>

      {/* Payment Method Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center">
          Select Payment Method <BsCashCoin className='ml-2' />
        </h2>
        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className={`block w-full p-2 border ${formErrors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-gray-700`}
        >
          <option value="" disabled>Select a payment method</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Credit/Debit/ATM Card/EMI">Credit/Debit/ATM Card/</option>
          <option value="EMI">EMI</option>
        </select>
        {formErrors.paymentMethod && <p className="text-red-500 text-sm mt-2">Please select a payment method.</p>}
      </div>

      {/* Conditional Bank Selection */}
      {paymentMethod === "Bank Transfer" && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">Select Bank</h2>
          <select
            value={selectedBank}
            onChange={handleBankChange}
            className="block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700"
          >
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
        <button
          onClick={handleConfirmPaymentClick}
          disabled={isSubmitting}
          className={`${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          } bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-gradient-to-l hover:from-blue-500 hover:to-pink-500`}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Payment'}
        </button>
      </div>

      {showConfirmPayment && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-pink-400 text-center">Confirm Payment</h2>
            <p className="text-center">Are you sure you want to proceed with the payment?</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePaymentCancel}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentYes}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
