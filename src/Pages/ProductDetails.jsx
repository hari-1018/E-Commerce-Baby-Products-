import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import '../../src/App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimilarProducts from '../Components/Similar_Products/SimilarProducts';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

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

  const getUserCart = async (userId) => {
    const response = await axios.get(`http://localhost:5000/users/${userId}`);
    return response.data.orders.flatMap(order => order.cartItems) || []; // Get cart items from orders
  };

  const handleAddToCart = async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate('/login');
      return;
    }

    const userId = JSON.parse(loggedInUser).id;

    addToCart(product);
    try {
      const currentCart = await getUserCart(userId);
      const updatedCart = [...currentCart, { ...product, quantity: 1 }];

      await axios.patch(`http://localhost:5000/users/${userId}`, { cart: updatedCart });
    } catch (err) {
      console.error("Error updating cart on server", err);
    }

    toast.success(
      <div style={{ backgroundColor: '#ffe5b4', border: '1px solid #ffcc00', borderRadius: '8px', padding: '10px' }}>
        <span style={{ fontWeight: 'bold', color: 'black' }}>Great Choice! Your item has been added to the Cart! ✨</span>
      </div>
    );
  };

  const handleQuickBuy = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate('/login');
      return;
    }

    const totalAmount = product.price * 1;
    navigate('/payment', { state: { cartItems: [{ ...product, quantity: 1 }], totalAmount } });
  };

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <div className="product-details-container bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-24 mb-12 h-auto">
        {product ? (
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Product Image section */}
            <div className="flex-1 lg:w-1/2">
              <div
                className={`relative flip-container ${isFlipped ? 'flipped' : ''} w-full my-12`}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
              >
                <div className="flipper">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="front w-full h-auto object-cover rounded-lg shadow-md"
                  />
                  <img
                    src={product.flip_image_url} 
                    alt={product.name}
                    className="back w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Product Details section */}
            <div className="flex-1 lg:w-1/2 my-12">
              <h1 className="text-2xl font-bold text-indigo-600 mb-2">{product.name}</h1>
              <p className="text-base md:text-lg text-gray-700 mb-2">{product.description}</p>
              <p className="font-semibold md:text-base text-yellow-500 mb-2">More Info: {product.additional_details}</p>

              {product.material && (
                <p className="text-base font-semibold md:text-lg text-yellow-500 mb-4">Material: {product.material}</p>
              )}

              {product.in_stock ? (
                <>
                  {product.discount > 0 ? (
                    <>
                      <p className="text-xl font-semibold text-red-500 line-through">MRP: ₹ {product.mrp.toFixed(2)}/-</p>
                      <p className="text-small font-semibold text-green-600">{product.discount} % Off</p>
                      <p className="text-2xl font-semibold text-green-600 mb-2">Offer Price: ₹ {product.price.toFixed(2)}/-</p>
                    </>
                  ) : (
                    <p className="text-2xl font-semibold text-indigo-600 mb-2">MRP: ₹ {product.mrp.toFixed(2)}/-</p>
                  )}
                  <div className='border bg-green-400 w-[60px] h-[30px] mb-2'>
                    <p className="text-lg font-bold text-white mb-2">⭐ {product.stars}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-yellow-500">{product.stock} Stocks Available</p>
                  </div>
                  <div className='w-[300px] h-[30px] mb-2'>
                    {product.stock <= 5 && <p className="text-red-500 font-bold mb-2">Hurry Up! Only few left!</p>}
                  </div>
                </>
              ) : (
                <p className="text-red-500 font-bold mb-4">Currently Out of Stock</p>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-pink-500"
                  disabled={!product.in_stock}
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleQuickBuy}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-pink-500"
                  disabled={!product.in_stock}
                >
                  Quick Buy
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-2xl font-bold text-gray-600">Product not found.</p>
        )}
      </div>

      {/* Similar Products section outside of the product details container */}
      {/* Pass the current product's category and ID to SimilarProducts */}
      <SimilarProducts currentCategory={product.category} currentProductId={product.id} />
    </div>
  );
};

export default ProductDetails;
