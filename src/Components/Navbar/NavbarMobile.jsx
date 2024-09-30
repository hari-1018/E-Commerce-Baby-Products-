import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const NavMobile = ({ open }) => {
    const navigate = useNavigate();
    return (
        <>
            {open && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-20 md:hidden">
                    <div className="relative w-full h-full flex flex-col justify-center items-center gap-6 p-6">
                        <div className="bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-md w-11/12 max-w-md">
                            {/* Search Input */}
                            <div className="w-full mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Search product" 
                                    className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                            </div>

                            {/* Navigation Links */}
                            <ul className="flex flex-col gap-4 text-lg font-semibold">
                                <li className="cursor-pointer text-center hover:text-blue-400 transition">
                                    <Link to="/">HOME</Link>
                                </li>
                                <li className="cursor-pointer text-center hover:text-blue-400 transition">
                                    <Link to="/shop">SHOP</Link>
                                </li>
                                <li className="cursor-pointer text-center hover:text-blue-400 transition">
                                    <Link to="/about">ABOUT US</Link>
                                </li>
                                <li className="cursor-pointer text-center hover:text-blue-400 transition">
                                    <Link to="/contact">CONTACT US</Link>
                                </li>
                            </ul>

                            {/* Action Buttons */}
                            <div className="flex justify-between gap-4 mt-6">
                                <button 
                                    className="w-1/2 border-2 border-black py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white transition-colors"
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </button>
                                <button 
                                    className="w-1/2 border-2 border-black py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white transition-colors"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

NavMobile.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default NavMobile;
