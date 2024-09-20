import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Baby_Buds.png';
import { BsFillCartFill, BsPersonCircle } from "react-icons/bs";
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Darkmode from './Darkmode';
import axios from 'axios';
import { MdMenu } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import NavMobile from './NavbarMobile';
// import SearchProduct from '../../Pages/SearchProduct';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission (page reload)
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showUserData, setShowUserData] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);

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

  const fetchCartCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart');
      setCartCount(response.data.length);
    } catch (err) {
      console.error('Error fetching cart count', err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    checkLoginState();
    fetchCartCount();
    window.addEventListener('loginChange', checkLoginState);

    const interval = setInterval(() => {
      fetchCartCount();
    }, 1000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('loginChange', checkLoginState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setShowUserData(false);
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 z-50 bg-white text-white p-2 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <img className="w-28 h-24" src={logo} alt="Baby-Buds Logo" />
          <p
            onClick={() => navigate('/')}
            className="text-lg font-bold tracking-wider cursor-pointer"
          >
            BABY-BUDS
          </p>
        </div>

        <ul className={`menu items-center gap-10 font-bold hidden md:flex`}>
          <li className="cursor-pointer text-base hover:text-blue-400"><Link to="/">HOME</Link></li>
          <li className="cursor-pointer text-base hover:text-blue-400"><Link to="/shop">SHOP</Link></li>
          <li className="cursor-pointer text-base hover:text-blue-400"><Link to="/about">ABOUT US</Link></li>
          <li className="cursor-pointer text-base hover:text-blue-400"><Link to="/contact">CONTACT US</Link></li>
        </ul>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-2xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="items-center gap-4 hidden md:flex">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-bar text-gray-800 w-0 transition-all duration-300 rounded-full px-3 py-1 focus:outline-none group-hover:w-[300px] group-hover:border-2 group-hover:border-pink-400 pr-10"
            />
            <button type="submit">
              <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-400 size-6" />
            </button>
          </form>

          {!isLoggedIn ? (
            <button
              className="px-4 py-2 bg-pink-400 text-white font-bold rounded"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <BsPersonCircle
                className="text-3xl cursor-pointer text-pink-400"
                onClick={() => setShowUserData(!showUserData)}
              />
              {showUserData && (
                <div className="absolute w-72 right-0 mt-2 p-4 bg-white text-black shadow-lg rounded-md dark:bg-gray-800 dark:text-white">
                  <p><b>Username:</b> {userData.username}</p>
                  <p><b>Email:</b> {userData.email}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-pink-400 text-white font-bold rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="relative flex items-center">
            <div className="absolute bottom-6 right-0 bg-pink-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border border-gray-300">
              {cartCount}
            </div>
            <Link to="/cart">
              <BsFillCartFill className="text-3xl cursor-pointer text-pink-400" />
            </Link>
          </div>

          <Darkmode />
        </div>
        <div className="inline-block md:hidden text-3xl font-extrabold text-black">
          <button
            onClick={() => setOpen(!open)}
            style={{ display: open ? 'none' : 'inline-block' }}
          >
            <MdMenu />
          </button>
          <button
            onClick={() => setOpen(!open)}
            style={{ display: open ? 'inline-block' : 'none' }}
          >
            <IoClose />
          </button>
        </div>
      </nav>
      <NavMobile open={open} />
    </>
  );
};

export default Navbar;