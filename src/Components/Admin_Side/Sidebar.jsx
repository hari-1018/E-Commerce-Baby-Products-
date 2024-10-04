import { FaUsers } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { MdSpaceDashboard, MdLocalShipping } from "react-icons/md";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
    <aside className="w-64 bg-gray-800 text-white p-6 fixed h-full">
        <h2 className="text-3xl font-bold mt-16 mb-8 text-center">BabyBuds</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
          <Link to='/admin/dashboard'>Dashboard<MdSpaceDashboard className='ml-[75px] -mt-5 size-5' /></Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to='/admin/all-orders'>Orders<MdLocalShipping className='ml-[55px] -mt-5 size-5'/></Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/admin/all-customers">Customers<FaUsers className='ml-[80px] -mt-5 size-5'/></Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/admin/all-products">Products<BsCartCheckFill className='ml-[65px] -mt-5 size-5' /></Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <span>Earnings<GiMoneyStack className='ml-[60px] -mt-6 size-6'/></span>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>  
    </>
  )
}

export default Sidebar