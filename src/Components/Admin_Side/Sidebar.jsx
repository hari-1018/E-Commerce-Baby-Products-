import { FaUsers } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { MdSpaceDashboard, MdLocalShipping } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <aside className={`fixed h-full bg-gray-800 text-white p-6 transition-transform duration-300 ${isOpen ? 'w-64' : 'w-16'} `}>
        <h2 className={`text-3xl font-bold mt-16 mb-8 text-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>BabyBuds</h2>
        <button
          onClick={toggleSidebar}
          className={`absolute top-6 right-[-30px] text-gray-300 ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
        >
          {isOpen ? '→' : '←'}
        </button>
        <ul className="space-y-4 mt-16">
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to='/admin/dashboard' className={`flex items-center ${isOpen ? '' : 'justify-center'} transition-all duration-300`}>
              Dashboard
              {isOpen && <MdSpaceDashboard className='ml-[5px] size-5' />}
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to='/admin/all-orders' className={`flex items-center ${isOpen ? '' : 'justify-center'} transition-all duration-300`}>
              Orders
              {isOpen && <MdLocalShipping className='ml-[5px] size-5' />}
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/admin/all-customers" className={`flex items-center ${isOpen ? '' : 'justify-center'} transition-all duration-300`}>
              Customers
              {isOpen && <FaUsers className='ml-[5px] size-5' />}
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/admin/all-products" className={`flex items-center ${isOpen ? '' : 'justify-center'} transition-all duration-300`}>
              Products
              {isOpen && <BsCartCheckFill className='ml-[5px] size-5' />}
            </Link>
          </li>
        </ul>
      </aside>
      <main className={`flex-1 p-6 bg-gray-100 overflow-auto ${isOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        <Outlet />
      </main>
    </>
  )
}

export default Sidebar;
