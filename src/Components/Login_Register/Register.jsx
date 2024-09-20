import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Install axios with `npm install axios`

const Register = () => {
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [iferrors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const clickSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    setSubmit(true);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post('http://localhost:5000/users', data);
        alert('Registration successful!');
        navigate('/login');
      } catch (error) {
        alert('Error registering user.');
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 4) {
      errors.username = "Username must be more than 4 characters";
    } else if (values.username.length > 12) {
      errors.username = "Username cannot exceed more than 12 characters";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="flex items-center justify-center bg-blue-100">
      <form
        onSubmit={clickSubmit}
        className="bg-white mt-28 mb-16 p-4 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-400">
          Thanks For Choosing Us..🤩
        </h2>
        <h3 className="text-xl font-bold mb-4 text-center text-blue-400">
          Register Now 🎉
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Fill out the form below to create your account.
        </p>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Username:</b>
          <input
            className="w-full text-gray-900 mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="text"
            name="username"
            placeholder="Enter Your Username"
            value={data.username}
            onChange={handleSubmit}
          />
          <p className="text-red-500 text-sm mt-1">{iferrors.username}</p>
          <span className="text-gray-500 text-sm">
            Username should have 4-12 characters
          </span>
        </label>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">E-mail:</b>
          <input
            className="w-full mt-2 text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="email"
            name="email"
            placeholder="Enter Your E-mail"
            value={data.email}
            onChange={handleSubmit}
          />
          <p className="text-red-500 text-sm mt-1">{iferrors.email}</p>
          <span className="text-gray-500 text-sm">Enter a valid e-mail</span>
        </label>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Password:</b>
          <input
            className="w-full mt-2 text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={data.password}
            onChange={handleSubmit}
          />
          <p className="text-red-500 text-sm mt-1">{iferrors.password}</p>
          <span className="text-gray-500 text-sm">
            Password should contain at least 6 characters, including an uppercase, symbol, or number.
          </span>
        </label>

        <input
          type="submit"
          className="w-full bg-pink-400 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-400 transition-colors duration-300 cursor-pointer"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Register;
