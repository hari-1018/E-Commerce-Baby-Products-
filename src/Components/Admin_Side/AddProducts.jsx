import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    in_stock: true, // Set default to true
    stock: '',
    discount: 0,
    quantity: 1,
    additional_details: '',
    mrp: '', // Ensure this state is included
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (name === 'in_stock') {
      // Convert the string value to boolean
      setProduct({ ...product, [name]: value === 'true' }); // Convert to boolean
    } else if (type === 'checkbox') {
      setProduct({ ...product, [name]: checked }); // Toggle in_stock
    } else if (
      name === 'price' ||
      name === 'discount' ||
      name === 'stars' ||
      name === 'quantity' ||
      name === 'stock' ||
      name === 'mrp'
    ) {
      // Convert the input value to a number; if empty, set to ''
      setProduct({ ...product, [name]: value ? Number(value) : '' });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/item', product);
      navigate('/all-products');
      toast.success(
        <div>
          <span style={{ fontWeight: 'bold' }}>Product Added Successfully! 👍</span>
        </div>,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: '#ffe5b4',
            border: '1px solid #ffcc00',
            color: '#333',
            width: '300px',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '16px',
          },
          progressStyle: {
            backgroundColor: '#ffcc00',
          },
        }
      );
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 mt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-pink-500 mb-4">
          Add Product
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Product Id:</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
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
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Discount:</label>
          <input
            type="number" // Changed to number input
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        {/* Show MRP and Offer Price if discount > 0 */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">₹ MRP:</label>
          <input
            type="number" // Changed to number input
            name="mrp"
            value={product.mrp}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {product.discount > 0 ? (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">₹ Offer Price:</label>
            <input
              type="number" // Changed to number input
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-700"
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">₹ Price:</label>
            <input
              type="number" // Changed to number input
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-700"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Stars:</label>
          <input
            type="number"
            name="stars"
            value={product.stars}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Clothes">Clothes</option>
            <option value="Gear">Baby Gears</option>
            <option value="Toys">Toys</option>
            <option value="Care">Baby Care</option>
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
            className="w-full border rounded px-3 py-2 text-gray-700"
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
            className="w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">In Stock:</label>
          <select
            name="in_stock"
            value={product.in_stock ? 'true' : 'false'} // Ensure value is string
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {product.in_stock && ( // Show stock input only if in_stock is true
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Stock Available(No.s):</label>
            <input
              type="number" // Changed to number input
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-700"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Additional Details:</label>
          <textarea
            name="additional_details"
            value={product.additional_details}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
