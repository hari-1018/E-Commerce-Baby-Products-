import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsFillPenFill } from 'react-icons/bs';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/item');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`); // Navigate to EditProduct with the product ID
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-center text-pink-500 mb-8">All Products</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Item</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-2 px-2 border">
                <img src={product.image_url} alt={product.name} className="w-16 h-16 mx-auto object-cover" />
              </td>
              <td className="py-2 px-2 border font-bold">{product.name}</td>
              <td className="py-2 px-2 border font-semibold">₹ {product.price}</td>
              <td className="py-2 px-2 border">
                <button
                  className="bg-blue-500 border-2 p-2 text-white"
                  onClick={() => handleEdit(product.id)} // Call handleEdit on button click
                >
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

export default AllProducts;
