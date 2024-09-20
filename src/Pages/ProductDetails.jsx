import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/item/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product", err);
        setError("An error occurred while fetching the product. Please try again.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate('/login');  // Redirect to login page if not logged in
      return;
    }

    try {
      const cartResponse = await axios.get('http://localhost:5000/cart');
      const existingItem = cartResponse.data.find(item => item.id === product.id);

      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        await axios.put(`http://localhost:5000/cart/${existingItem.id}`, updatedItem);
      } else {
        const cartItem = { ...product, quantity: 1 };
        await axios.post('http://localhost:5000/cart', cartItem);
      }
      navigate('/cart');
    } catch (err) {
      console.error("Error adding to cart", err);
      setError("An error occurred while adding the product to the cart.");
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="product-details-container bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-28 mb-24">
      {product ? (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="flex-1 lg:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="flex-1 lg:w-1/2">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4">{product.name}</h1>
            <p className="text-base md:text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="font-semibold md:text-base text-yellow-500 mb-4">More Info: {product.additional_details}</p>

            {product.material && (
              <p className="text-base font-semibold md:text-lg text-yellow-500 mb-4">Material: {product.material}</p>
            )}

            {product.discount > 0 ? (
              <>
                <p className="text-xl font-semibold text-red-500 mb-4 line-through">MRP: ₹ {product.mrp.toFixed(2)}/-</p>
                <p className="text-small font-semibold text-green-600 mb-4">{product.discount} % Off</p>
                <p className="text-2xl font-semibold text-green-600 mb-4">Offer Price: ₹ {product.price.toFixed(2)}/-</p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-indigo-600 mb-4">MRP: ₹ {product.price}/-</p>
            )}

            <p className="text-lg font-medium text-yellow-500 mb-6">⭐ {product.stars}</p>

            <button 
              onClick={handleAddToCart} 
              className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-gradient-to-l hover:from-blue-500 hover:to-pink-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-2xl font-bold text-gray-600">Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
