import { useState } from 'react';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProfileData = ({ userData, handleLogout, closeProfile }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] h-96 flex flex-col md:flex-row p-5 relative">
        <FaTimes
          className="absolute top-4 right-4 text-pink-400 cursor-pointer hover:text-pink-500"
          onClick={closeProfile}
          size={24}
        />

        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-orange-500 to-pink-400 p-5 rounded-lg md:w-1/2">
          <img
            src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-icon-isolated-on-abstract-background-png-image_5192004.jpg"
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4"
          />
          <h2 className="text-white font-bold text-xl">
            Hello, {userData.admin ? "Admin" : userData.username}
          </h2>
          <p className='text-white font-semibold text-small mt-4'>
            {userData.admin ? "Take Your Charge" : "Thanks for choosing us!"}
          </p>
        </div>

        <div className="flex flex-col p-4 md:w-2/3">
          <h3 className="font-bold text-lg mb-2 text-center text-pink-500">Personal Information</h3>
          <div className="flex justify-between text-sm mt-8 mb-6">
            <p>Username:</p>
            <p className="font-semibold">{userData.username}</p>
          </div>
          <div className="flex justify-between text-sm mb-6">
            <p>Email:</p>
            <p className="font-semibold">{userData.email}</p>
          </div>
          <div className="flex justify-between text-sm mb-6">
            <p>Phone:</p>
            <p className="font-semibold">{userData.mobile}</p>
          </div>
          <div className="flex justify-between items-center text-sm mb-6">
            <p>Password:</p>
            <div className="flex items-center">
              <p className="font-semibold mr-2">
                {showPassword ? userData.password : '********'}
              </p>
              {showPassword ? (
                <FaEye
                  className="cursor-pointer text-pink-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="cursor-pointer text-pink-400"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          <button
            onClick={handleLogoutClick}
            className="mt-6 font-bold bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-500 w-full"
          >
            Logout
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-pink-400 text-center">Are you sure you want to logout?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleCancelLogout}
                className="bg-green-300 text-gray-700 py-2 px-4 rounded hover:bg-green-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleLogout();  // Immediately log out and clear the cart
                }}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileData.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired, // Added admin field
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
  closeProfile: PropTypes.func.isRequired,
};

export default ProfileData;
