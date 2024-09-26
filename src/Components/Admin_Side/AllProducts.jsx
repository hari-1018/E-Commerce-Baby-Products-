import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsFillPenFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset to full list if search is cleared
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/item');
      setProducts(response.data);
      setFilteredProducts(response.data); // Set filtered products initially to all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/item/${id}`);
        // Update the state to remove the deleted product
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts); // Update filtered products too
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAdd = () => {
    navigate('/add-product');
  };

  return (
    <div className="p-8 bg-gray-100 mt-16">
      <h1 className="text-2xl font-bold text-center text-pink-500 mb-4">All Products</h1>
      <form onSubmit={handleSearchSubmit} className="relative group mb-4 text-center">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar text-gray-800 w-[250px] border-2 border-pink-400 rounded-full px-3 py-1 focus:outline-pink-400"
        />
        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-400">
          <FaSearch />
        </button>
      </form>

      <div className="flex justify-center mb-4 mt-2">
        <button onClick={handleAdd} className="bg-pink-400 text-white font-bold rounded-full py-2 px-4 mr-4">
          Add New Product
          <IoMdAddCircle className="inline ml-1 mb-1" />
        </button>
      </div>

      <table className="mx-40 bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Item</th>
            <th className="py-2 px-4 border w-1/4">Name</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-2 px-2 border w-[150px]">
                <img src={product.image_url} alt={product.name} className="w-20 h-20 mx-auto object-cover" />
              </td>
              <td className="py-2 px-2 border font-bold w-[300px]">{product.name}</td>
              <td className="py-2 px-2 border font-semibold w-[50px]">₹ {product.price.toFixed(2)} /-</td>
              <td className="py-2 px-2 border w-[50px]">
                <button
                  className="bg-blue-500 border-2 p-2 text-white mr-2"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                  <BsFillPenFill className="inline ml-1 mb-1" />
                </button>

                <button
                  className="bg-red-500 border-2 p-2 text-white"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                  <MdDelete className="inline mb-1" />
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
