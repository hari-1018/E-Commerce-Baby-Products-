import logo from '../../assets/Baby_Buds.png';
import { BsFillCartFill, BsPersonCircle } from "react-icons/bs"; // User icon
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../CSS/Navbar.css';
import Darkmode from './Darkmode';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showUserData, setShowUserData] = useState(false);

  const checkLoginState = () => {
    const userInfo = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userInfo) {
      setIsLoggedIn(true);
      setUserData(userInfo);
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkLoginState();
    const handleLoginChange = () => {
      checkLoginState();
    };
    window.addEventListener('loginChange', handleLoginChange);
    return () => {
      window.removeEventListener('loginChange', handleLoginChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedInUser'); // Also clear sessionStorage
    checkLoginState();
    setShowUserData(false);
    navigate('/');
  };

  return (
    <nav>
      <div className="flex justify-between p-2 w-full h-24 dark:bg-gray-900 dark:text-white duration-200 relative">
        <div className="logo flex items-center gap-2.5">
          <img className="w-28 h-24" src={logo} alt="Baby-Buds Logo" />
          <p 
            onClick={() => navigate('/')}
            className="text-lg font-bold tracking-wider cursor-pointer"
          >
            BABY-BUDS
          </p>
        </div>

        <ul className="menu flex items-center gap-10 font-bold">
          <li className="cursor-pointer text-lg home"><Link to='/'>HOME</Link></li>
          <li className="cursor-pointer text-lg shop"><Link to='/shop'>SHOP</Link></li>
          <li className="cursor-pointer text-lg about"><Link to='/about'>ABOUT US</Link></li>
          <li className="cursor-pointer text-lg about"><Link to='/contact'>CONTACT US</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search Products..."
              className="search-bar w-0 transition-all duration-300 rounded-full px-3 py-1 focus:outline-none group-hover:w-[300px] group-hover:border-2 group-hover:border-pink-400 pr-10"
            />
            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-400 size-6" />
          </div>

          {!isLoggedIn ? (
            <button 
              className="button px-4 py-2 text-white font-bold rounded"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <BsPersonCircle 
                className="text-3xl cursor-pointer" 
                onClick={() => setShowUserData(!showUserData)}
              />
              {showUserData && (
                <div className="absolute w-72 right-0 mt-2 p-4 bg-white shadow-lg rounded-md dark:bg-gray-800 dark:text-white">
                  <p><b>Username:</b> {userData.username}</p>
                  <button 
                    className="mt-2 w-full bg-pink-400 text-white font-bold py-2 rounded-lg hover:bg-blue-400"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <Link to="/cart">
            <BsFillCartFill className="text-2xl text-pink-400 cursor-pointer" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
