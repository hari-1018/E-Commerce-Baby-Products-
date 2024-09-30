import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
    <div className="shop-container mb-12 mt-28 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-2 text-pink-400 tracking-wide">Our Products</h1>
      <p className="text-center font-semibold text-md text-blue-400 mb-8">Explore our wide range of premium baby products, designed for your little one&apos;s comfort and care🎉.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div 
              className="flex flex-col p-4 border border-gray-200 shadow-lg rounded-xl hover:bg-blue-100 hover:scale-105 transition-transform duration-300 ease-in-out bg-white"
            >
              <div className="w-full h-40 mb-4 flex items-center justify-center">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
              <h2 className="text-md font-bold mb-2 text-center text-gray-900">{product.name}</h2>
              <p className="text-center text-md font-semibold text-green-600 mb-4">₹ {product.mrp.toFixed(2)}/-</p>
              <button className="mt-auto py-2 w-full text-white font-bold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 shadow-md hover:shadow-xl">
                View Details
              </button>
            </div>
          </Link>
          
        ))}
      </div>
    </div>
    
  );
  
};


export default Shop;
