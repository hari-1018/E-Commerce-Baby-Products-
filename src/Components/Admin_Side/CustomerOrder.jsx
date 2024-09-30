import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CustomerOrder() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null); 
  const [orders, setOrders] = useState([]);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${customerId}`);
      setCustomer(response.data); 
      setOrders(response.data.order);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  return (
    <div className="p-8 bg-gray-100">
      <Link to="/customers" className="text-pink-500 mb-4 inline-block">
        Back to Customers
      </Link>
      <h1 className="text-3xl font-bold text-center text-pink-500 mt-4 mb-4">Order Details</h1>

      {/* Display customer details */}
      {customer && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Customer Details</h2>
          <p><strong>Username:</strong> {customer.username}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Mobile:</strong> {customer.mobile}</p>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">Items</th>
            <th className="py-2 px-4 border">Total Price</th>
            <th className="py-2 px-4 border">Shipping Address</th>
            <th className="py-2 px-4 border">Payment Method</th>
            <th className="py-2 px-4 border">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="py-2 px-2 border text-gray-600">{order.id}</td>
              <td className="py-2 px-2 border">
                <ul>
                  {order.cartItems.map((item) => (
                    <li key={item.id} className="flex items-center mb-2">
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 mr-2" />
                      <span className="text-gray-600">{item.name} (Qty: {item.quantity})</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-2 border font-semibold text-gray-600">₹ {order.totalAmount}/-</td>
              <td className="py-2 px-2 border text-gray-600">{order.shippingAddress}</td>
              <td className="py-2 px-2 border text-gray-600">{order.paymentMethod}</td>
              <td className="py-2 px-2 border text-gray-600">
                {new Date(order.orderDate).toLocaleDateString()}
                {', ' + new Date(order.orderDate).toLocaleTimeString()}
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" className="py-2 px-2 border text-center text-gray-600">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrder;
