import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); // Update the API endpoint as necessary
        // Filter users that have orders
        const usersWithOrders = response.data.filter(user => user.order && user.order.length > 0);
        setOrders(usersWithOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Function to determine the order status
  const getOrderStatus = (orderDate) => {
    const now = new Date();
    const orderTime = new Date(orderDate);
    const timeDifference = now - orderTime; // difference in milliseconds

    const hoursElapsed = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert to hours

    if (hoursElapsed < 12) {
      return 'Pending ⏳';
    } else if (hoursElapsed < 48) {
      return 'Shipped 🚛';
    } else {
      return 'Delivered ✅';
    }
  };

  return (
    <div className="p-8 bg-gray-100 mt-16">
      <h1 className="text-2xl font-bold text-center text-pink-500 mb-4">All Orders</h1>
      <table className="mx-auto bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">UserId</th>
            <th className="py-2 px-4 border">Username</th>
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">Cart Items</th>
            <th className="py-2 px-4 border">Total Amount</th>
            <th className="py-2 px-4 border">Payment Method</th>
            <th className="py-2 px-4 border">Order Date</th>
            <th className="py-2 px-4 border">Order Status</th> {/* New Column */}
          </tr>
        </thead>
        <tbody>
          {orders.map(user => 
            user.order.map(order => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border text-gray-600">{user.id}</td>
                <td className="py-2 px-4 border text-gray-600">{user.username}</td>
                <td className="py-2 px-4 border text-gray-600">{order.id}</td>
                <td className="py-2 px-4 border text-gray-500">
                  {order.cartItems.map(item => (
                    <div key={item.id} className="flex items-center mb-1">
                      <img src={item.image_url} alt={item.name} className="w-10 h-10 mr-2 object-cover" />
                      <span>{item.name} (Qty: {item.quantity})</span>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border text-gray-600 font-semibold">₹ {order.totalAmount.toFixed(2)} /-</td>
                <td className="py-2 px-4 border text-gray-600">{order.paymentMethod}</td>
                <td className="py-2 px-4 border text-gray-600">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="py-2 px-4 border text-gray-600">{getOrderStatus(order.orderDate)}</td> {/* Order Status */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
