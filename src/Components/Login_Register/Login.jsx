import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Load remembered user data if available
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setFormData({ username: user.username, password: "" }); // Clear password for security
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;

      const foundUser = users.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );

      if (foundUser) {
        if (rememberMe) {
          localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        } else {
          sessionStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        }
        window.dispatchEvent(new Event('loginChange')); // Notify of login state change
        navigate('/'); // Navigate to home
      } else {
        setError("Incorrect Username or Password. Please Try Again.");
      }
    } catch (err) {
      console.error("Error fetching users", err);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white mt-20 p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-400">
          Welcome Back - Unlock Your Space 🤩
        </h2>
        <h3 className="text-base font-bold mb-4 text-center text-blue-400">
          Let&apos;s Get Started 🎉
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Just a Click Away..!
        </p>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Username:</b>
          <input
            className="w-full mt-2 p-3 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="text"
            name="username"
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Password:</b>
          <input
            className="w-full mt-2 p-3 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-base font-semibold">Remember Me</label>
        </div>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-pink-400 ml-36 font-semibold"
        >
          Forgot Password? 😞
        </button>

        <input
          type="submit"
          className="mt-8 w-full bg-pink-400 text-white font-bold text-xl py-3 px-4 rounded-lg shadow-md hover:bg-blue-400 transition-colors duration-300 cursor-pointer"
          value="Log In"
        />

        <div className="flex items-center justify-center mt-4">
          <span className="text-sm text-gray-600">Don&apos;t have an account?
            <button
              onClick={() => navigate('/register')}
              className="ml-2 text-pink-400 font-semibold"
            >
              Register
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
