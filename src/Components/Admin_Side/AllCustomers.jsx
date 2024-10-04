import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { FaTimes } from 'react-icons/fa';

function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [actionType, setActionType] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const nonAdminCustomers = response.data.filter(customer => !customer.admin);
      setCustomers(nonAdminCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleBlockUnblock = (customerId, isBlocked) => {
    setSelectedCustomer(customerId);
    setActionType(isBlocked ? 'unblock' : 'block');
    setShowConfirmModal(true);
  };

  const confirmBlockUnblock = async () => {
    if (selectedCustomer) {
      try {
        await axios.patch(`http://localhost:5000/users/${selectedCustomer}`, {
          blocked: actionType === 'block', 
        });
        fetchCustomers(); 
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error updating customer status:', error);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      customer.username.toLowerCase().includes(lowerCaseSearchTerm) ||
      customer.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      customer.mobile.includes(lowerCaseSearchTerm) ||
      customer.id.toString().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="p-8 bg-gray-100">

      <h1 className="text-3xl font-bold ml-[750px] text-pink-500 mt-16 mb-4">All Customers</h1>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar text-gray-800 w-[250px] mr-[500px] border-2 border-pink-400 rounded-full px-3 py-1 focus:outline-pink-400"
        />
      </div>

      <table className="ml-56 w-[1220px] bg-white border border-gray-300">
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
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
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
                  <Link to={`/admin/customer-order/${customer.id}`}>
                    <button className="bg-green-500 text-white p-2">
                      Order Details
                    </button>
                  </Link>
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
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-pink-400 text-center">
              Are you sure you want to {actionType} this customer?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-green-300 text-gray-700 py-2 px-4 rounded hover:bg-green-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmBlockUnblock}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCustomers;
