import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProduct() {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    stars: 0,
    category: '',
    image_url: '',
    flip_image_url: '',
    in_stock: true,
    stock: '',
    discount: 0,
    quantity: 1,
    additional_details: '',
    mrp: 0 
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/item/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'discount' || name === 'stars' || name === 'quantity' || name === 'stock' || name === 'mrp') {
      setProduct({ ...product, [name]: Number(value) }); 
    } else if (name === 'in_stock') {
      setProduct({ ...product, [name]: value === 'true' });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/item/${id}`, product);
      navigate('/admin/all-products');
      toast.success(
        <div style={{ backgroundColor: '#ffe5b4', border: '1px solid #ffcc00', borderRadius:'8px', padding: '10px'}}>
          <span style={{ fontWeight: 'bold', color: 'black'}}>Updated Product Successfully! 👍</span>
        </div>
      );

    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="p-8 bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md mt-20">
        <h1 className="text-2xl font-bold text-center text-pink-500 mb-4">Edit Product</h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name:</label>
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
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Display Discount field */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Discount (%):</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">₹ MRP:</label>
          <input
            type="text"
            name="mrp"
            value={product.mrp}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Display Offer Price if discount > 0 */}
        {product.discount > 0 ? (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">₹ Offer Price:</label>
            <input
              type="text"
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
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-700"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Stars (Rating):</label>
          <input
            type="number"
            name="stars"
            step="0.01"
            value={product.stars}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold ">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-grey-700 text-gray-800"
            required
          >
            <option value="" disabled>Select Category</option>
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
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">In Stock:</label>
          <select
            name="in_stock"
            value={product.in_stock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        {product.in_stock && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Stocks Available (No.s):</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-700"
              required
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
          <input
            type="text"
            name="additional_details"
            value={product.additional_details}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
