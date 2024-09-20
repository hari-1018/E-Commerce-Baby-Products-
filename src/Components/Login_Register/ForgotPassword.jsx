import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Fetch all users
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;
      
      // Find the user by username
      const user = users.find(user => user.username === formData.username);
      
      if (!user) {
        setError("User not found.");
        return;
      }

      // Update the user's password
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        password: formData.newPassword
      });

      setSuccess("Password updated successfully.");
      setError("");
      navigate('/login'); // Redirect to login page after successful update
    } catch (err) {
      console.error("Error updating password", err);
      setError("An error occurred while updating the password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handlePasswordReset}
        className="bg-white mt-12 mb-12 p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-400">
          Reset Your Password 🔑
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your username and confirm your new password.
        </p>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Username:</b>
          <input
            className="w-full mt-2 text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="text"
            name="username"
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">New Password:</b>
          <input
            className="w-full mt-2 text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
        </label>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Confirm Password:</b>
          <input
            className="w-full mt-2 text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <input
          type="submit"
          className="mt-8 w-full bg-pink-400 text-white font-bold text-xl py-3 px-4 rounded-lg shadow-md hover:bg-blue-400 transition-colors duration-300 cursor-pointer"
          value="Reset Password"
        />
      </form>
    </div>
  );
}

export default ForgotPassword;
