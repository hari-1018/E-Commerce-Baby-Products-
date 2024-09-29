import { useEffect, useState } from 'react';
import axios from 'axios';

function AllCustomers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      // Filter out admin users
      const nonAdminCustomers = response.data.filter(customer => !customer.admin);
      setCustomers(nonAdminCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleBlockUnblock = async (customerId, isBlocked) => {
    try {
      await axios.patch(`http://localhost:5000/users/${customerId}`, {
        blocked: !isBlocked, // Toggle block status
      });
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error('Error updating customer status:', error);
    }
  };

  const handleOrderDetails = (customerId) => {
    // Implement the functionality to view order details for the customer
    console.log(`Viewing order details for customer ID: ${customerId}`);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-pink-500 mt-16 mb-8">All Customers</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Mobile No.</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border w-[125px]">Order</th>
            <th className="py-2 px-4 border w-[50px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td className="py-2 px-2 border text-gray-600">{customer.id}</td>
              <td className="py-2 px-2 border text-gray-600 font-bold">{customer.username}</td>
              <td className="py-2 px-2 border text-gray-600">{customer.email}</td>
              <td className="py-2 px-2 border text-gray-600">{customer.mobile}</td>
              <td className="py-2 px-2 border">
                <span className={`font-bold ${customer.blocked ? 'text-red-500' : 'text-green-500'}`}>
                  {customer.blocked ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td className="py-2 px-2 border">
                <button
                  onClick={() => handleOrderDetails(customer.id)}
                  className="bg-green-500 text-white p-2"
                >
                  Order Details
                </button>
              </td>
              <td className="py-2 px-2 border">
                <button
                  onClick={() => handleBlockUnblock(customer.id, customer.blocked)}
                  className={`border-2 p-2 ${customer.blocked ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                >
                  {customer.blocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCustomers;
