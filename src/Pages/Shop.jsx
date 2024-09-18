import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch products from the JSON server
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/item');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products", err);
        setError("An error occurred while fetching products. Please try again.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    
    <div className="shop-container mb-10">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="flex flex-col relative p-4 border shadow-lg rounded-md hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300 bg-pink-100 hover:bg-blue-200">
            <img src={product.image_url} alt={product.name} className="w-full h-64 object-contain rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
            <Link to={`/product/${product.id}`}>
  <button className="mt-auto mb-auto w-full px-4 py-2 text-white font-bold rounded bg-blue-500 hover:bg-blue-600">
    View Details
  </button>
</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
