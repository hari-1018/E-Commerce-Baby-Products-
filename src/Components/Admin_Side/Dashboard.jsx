import { useEffect, useState } from 'react';
import { MdSpaceDashboard, MdAdminPanelSettings, MdLocalShipping } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Function to fetch total products
  const fetchTotalProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/item');
      setTotalProducts(response.data.length);
    } catch (error) {
      console.error('Error fetching total products:', error);
    }
  };

  const fetchTotalCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      // Filter out admin users
      const nonAdminCustomers = response.data.filter(customer => !customer.admin);
      setTotalCustomers(nonAdminCustomers.length);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchTotalOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users'); // Fetch all users to access their orders
      const ordersCount = response.data.reduce((acc, user) => {
        return acc + (user.order ? user.order.length : 0); // Count orders for each user
      }, 0);
      setTotalOrders(ordersCount);
    } catch (error) {
      console.error('Error fetching total orders:', error);
    }
  };

  const fetchTotalEarnings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users'); // Fetch all users to access their orders
      const earnings = response.data.reduce((acc, user) => {
        if (user.order) {
          user.order.forEach(order => {
            acc += order.totalAmount; // Sum total amount of each order
          });
        }
        return acc;
      }, 0);
      setTotalEarnings(earnings);
    } catch (error) {
      console.error('Error fetching total earnings:', error);
    }
  };

  useEffect(() => {
    fetchTotalProducts();
    fetchTotalCustomers();
    fetchTotalOrders();
    fetchTotalEarnings();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">BabyBuds</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <span>Dashboard<MdSpaceDashboard className='ml-[75px] -mt-5 size-5' /></span>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to='/all-orders'>Orders<MdLocalShipping className='ml-[55px] -mt-5 size-5'/></Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/all-customers">Customers<FaUsers className='ml-[80px] -mt-5 size-5'/></Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <Link to="/all-products">Products<BsCartCheckFill className='ml-[65px] -mt-5 size-5' /></Link>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <span>Earnings<GiMoneyStack className='ml-[60px] -mt-6 size-6'/></span>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow p-8 bg-gray-100 mt-20">
        <h1 className="text-3xl font-bold text-center text-pink-500 mb-8">Admin Dashboard <MdAdminPanelSettings className='ml-[730px] -mt-8'/></h1>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Total Products<BsCartCheckFill className='ml-[140px] -mt-7 size-6' /></h3>
              <p className="text-3xl font-semibold">{totalProducts}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Total Customers<FaUsers className='ml-[165px] -mt-7 size-7'/></h3>
              <p className="text-3xl font-semibold">{totalCustomers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Total Orders<MdLocalShipping className='ml-[125px] -mt-7 size-7'/></h3>
              <p className="text-3xl font-semibold">{totalOrders}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Total Earnings<GiMoneyStack className='ml-[140px] -mt-7 size-7'/></h3>
              <p className="text-3xl font-semibold">₹ {totalEarnings.toFixed(2)}/-</p>
            </div>
          </div>
        </div>

        {/* Sales Report (Chart) */}
        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4">Sales Report</h3>
          {/* Add chart here if needed */}
        </div>

        {/* Earnings Report */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-4">Earnings Report</h3>
          {/* Add earnings chart or table here if needed */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;