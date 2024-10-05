import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { MdSpaceDashboard, MdAdminPanelSettings, MdLocalShipping } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from 'react-router-dom';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  
  const [categoryOrders, setCategoryOrders] = useState([]);

  const categories = ['Clothes', 'Gear', 'Toys', 'Care', 'Food', 'Furniture'];

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
      const nonAdminCustomers = response.data.filter(customer => !customer.admin);
      setTotalCustomers(nonAdminCustomers.length);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchTotalOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;
      let orderCount = 0;
      const categoryCounts = Array(categories.length).fill(0);

      users.forEach(user => {
        if (user.order) {
          user.order.forEach(order => {
            orderCount += 1;
            // Updated to use cartItems instead of items
            if (order.cartItems) {
              order.cartItems.forEach(item => {
                const categoryIndex = categories.findIndex(
                  cat => cat.toLowerCase() === item.category.toLowerCase()
                );
                if (categoryIndex !== -1) {
                  categoryCounts[categoryIndex] += 1;
                }
              });
            }
          });
        }
      });

      setTotalOrders(orderCount);
      setCategoryOrders(categoryCounts); // Set the category orders
    } catch (error) {
      console.error('Error fetching total orders:', error);
    }
  };

  const fetchTotalEarnings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const earnings = response.data.reduce((acc, user) => {
        if (user.order) {
          user.order.forEach(order => {
            acc += order.totalAmount;
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

  // Data for the bar chart with categories
  const barData = {
    labels: categories, // Use categories as labels
    datasets: [
      {
        label: 'Number of Orders',
        data: categoryOrders, // Use categoryOrders as data
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Customize the bar colors
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart takes full width and height of the container
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Orders',
        },
        ticks: {
          stepSize: 5, // Set the step size to 5
        },
      },
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
    },
  };

  return (
    <div className="flex flex-col h-screen">

      {/* Main content */}
      <div className="flex-grow p-8 bg-gray-100 mt-12 ml-0"> {/* Adjust margin to account for fixed sidebar */}
        <h1 className="text-3xl font-bold text-center text-pink-500 mb-8">Admin Dashboard <MdAdminPanelSettings className='ml-[730px] -mt-8'/></h1>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
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
          <div className="h-96">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
