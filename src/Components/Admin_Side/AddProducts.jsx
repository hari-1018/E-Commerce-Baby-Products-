import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stars: '',
    category: '',
    image_url: '',
    flip_image_url: '',
    in_stock: true,
    special_offer: 'None',
    discount: 0,
    quantity: 1,
    additional_details: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/item', product);
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 mt-20">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-pink-500 mb-4">Add Product</h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Id:</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Name:</label>
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
          <label className="block mb-2 font-semibold">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Price:</label>
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
          <label className="block mb-2 font-semibold">Stars:</label>
          <input
            type="number"
            name="stars"
            value={product.stars}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            max={5} // Assuming the max stars value is 5
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Clothes">Clothes</option>
            <option value="Gear">Baby Gears</option>
            <option value="Toys">Toys</option>
            <option value="Food">Foods & Nutritions</option>
            <option value="Furniture">Furniture & Bedding</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Flip Image URL:</label>
          <input
            type="text"
            name="flip_image_url"
            value={product.flip_image_url}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">In Stock:</label>
          <input
            type="checkbox"
            name="in_stock"
            checked={product.in_stock}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Special Offer:</label>
          <input
            type="text"
            name="special_offer"
            value={product.special_offer}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Discount:</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Additional Details:</label>
          <textarea
            name="additional_details"
            value={product.additional_details}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
