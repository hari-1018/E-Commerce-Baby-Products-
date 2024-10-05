import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SimilarProducts = ({ currentCategory, currentProductId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentCategory) {
      setLoading(false);
      return;
    }

    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/item?category=${encodeURIComponent(currentCategory)}`); 
        
        const filteredProducts = response.data.filter(product => product.id !== currentProductId);
        
        setSimilarProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching similar products", err);
        setError("An error occurred while fetching similar products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [currentCategory, currentProductId]);

  if (loading) return <p className="text-center">Loading similar products...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (similarProducts.length === 0) {
    return <p className="text-center text-gray-500">No similar products found.</p>;
  }

  return (
    <div className="shop-container mb-12 mt-8 px-4">
      <h2 className="text-3xl font-extrabold text-center mb-4 text-pink-400 tracking-wide">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {similarProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}> {/* Updated path */}
            <div className="flex flex-col p-4 border border-gray-200 shadow-lg rounded-xl hover:bg-blue-100 hover:scale-105 transition-transform duration-300 ease-in-out bg-white">
              <div className='w-full h-40 mb-4 flex items-center justify-center'>
                <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain rounded-lg" />
              </div>
              <h2 className="text-md font-bold mb-2 text-center text-gray-900">{product.name}</h2>
              <p className="text-center text-md font-semibold text-green-600 mb-2">₹ {product.mrp.toFixed(2)}/-</p>
              <p className="text-center text-lg font-semibold text-yellow-500 mb-2">⭐ {product.stars}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
