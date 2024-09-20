
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const NavMobile = ({ open }) => {
    const navigate = useNavigate();
    return (
        <>
                {open && (
                    <div className="fixed top-26  w-full h-screen md:hidden z-20">
                        <div className="bg-black/80 p-4 m-4 rounded-md backdrop-blur flex flex-col justify-center items-center gap-6 z-40">
                            <div className="w-full md:hidden">
                                <input type="text" placeholder="search product" className="w-full h-2 p-2"/>
                            </div>
                            <div className="flex  justify-center items-center gap-6">
                                <ul className={`menu items-center gap-10 font-bold flex flex-col md:hidden`}>
                                    <li className="cursor-pointer text-lg hover:text-blue-400"><Link to="/">HOME</Link></li>
                                    <li className="cursor-pointer text-lg hover:text-blue-400"><Link to="/shop">SHOP</Link></li>
                                    <li className="cursor-pointer text-lg hover:text-blue-400"><Link to="/about">ABOUT US</Link></li>
                                    <li className="cursor-pointer text-lg hover:text-blue-400"><Link to="/contact">CONTACT US</Link></li>
                                </ul>
                            </div>
                            <div className="flex gap-6 w-full">
                                <button className="w-1/2 border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white " onClick={() => navigate('/register')}>
                                    Register
                                </button>
                                <button className="w-1/2 border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white " onClick={() => navigate('/login')}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

NavMobile.propTypes = {
    open: PropTypes.bool,
};

export default NavMobile;
