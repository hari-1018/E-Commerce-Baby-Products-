import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsFillPenFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircle } from 'react-icons/io';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/item');
      setProducts(response.data);
      setFilteredProducts(response.data);
      const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (query, category) => {
    let filtered = products;

    if (query.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/item/${id}`);
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAdd = () => {
    navigate('/admin/add-product');
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-pink-500 mt-12 mb-4 text-center">All Products</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar text-gray-800 w-full md:w-[250px] border-2 border-pink-400 rounded-full px-3 py-2 focus:outline-pink-400 mb-2 md:mb-0"
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border-2 text-gray-800 border-pink-400 rounded-full px-3 py-2 focus:outline-pink-400 w-full md:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center mb-4 mt-2">
        <button onClick={handleAdd} className="bg-pink-400 text-white font-bold rounded-full py-2 px-4 flex items-center">
          Add New Product
          <IoMdAddCircle className="inline ml-1 mb-1" />
        </button>
      </div>

      <table className="w-[1200px] bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border w-[300px]">Item</th>
            <th className="py-2 px-4 border w-[300px]">Name</th>
            <th className="py-2 px-4 border w-[300px]">Price</th>
            <th className="py-2 px-4 border w-[300px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-2 border w-[150px]">
                  <img src={product.image_url} alt={product.name} className="w-20 h-20 mx-auto object-cover" />
                </td>
                <td className="py-2 px-2 border font-bold w-[300px] text-gray-600">{product.name}</td>
                <td className="py-2 px-2 border font-semibold text-gray-600">₹ {product.mrp.toFixed(2)} /-</td>
                <td className="py-2 px-2 border">
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
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
