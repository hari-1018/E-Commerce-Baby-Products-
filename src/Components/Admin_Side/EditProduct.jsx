import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const [product, setProduct] = useState({ name: '', price: '', image_url: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL

  // Fetch product details based on the product ID
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/item/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated product data to the backend
      await axios.put(`http://localhost:5000/item/${id}`, product);
      // Navigate back to the products list after successful update
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    fetchProduct(); // Fetch product data when component mounts
  }, [id]);

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-pink-500 mb-8">Edit Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
