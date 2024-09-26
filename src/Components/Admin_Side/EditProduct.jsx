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
    
    // Ensure numeric fields are correctly parsed
    if (name === 'price' || name === 'discount' || name === 'stars' || name === 'quantity') {
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
      navigate('/all-products');
      toast.success(
        <div>
          <span style={{ fontWeight: 'bold' }}>Updated Product Successfully! 👍</span>
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
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="p-8 bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md mt-20">
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
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {product.discount > 0 && (
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
        )}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Discount (%):</label>
          <input
            type="text"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          {product.discount > 0 && (
            <label className="block mb-2 font-semibold">₹ Offer Price:</label>
          )}
          {product.discount == 0 && (
            <label className="block mb-2 font-semibold">₹ MRP:</label>
          )}
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Stars (Rating):</label>
          <input
            type="text"
            name="stars"
            value={product.stars}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
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

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Special Offer:</label>
          <input
            type="text"
            name="special_offer"
            value={product.special_offer}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Quantity:</label>
          <input
            type="text"
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

        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
