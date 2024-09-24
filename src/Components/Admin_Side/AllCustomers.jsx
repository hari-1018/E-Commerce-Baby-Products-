import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillPenFill } from 'react-icons/bs';

function AllCustomers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-pink-500 mb-8">All Customers</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Mobile No.</th>

            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td className="py-2 px-2 border">{customer.id}</td>
              <td className="py-2 px-2 border font-bold">{customer.username}</td>
              <td className="py-2 px-2 border">{customer.email}</td>
              <td className="py-2 px-2 border">{customer.mobile}</td>

              <td className="py-2 px-2 border">
                <button className="bg-blue-500 border-2 p-2 text-white">
                  <BsFillPenFill className="inline mr-1" /> Edit
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
