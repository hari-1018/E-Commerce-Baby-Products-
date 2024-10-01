import { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow components
const CustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <button
      className={`absolute z-10 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full 
                 shadow-lg hover:bg-pink-600 transition duration-300 ${direction === 'left' ? 'left-2' : 'right-2'}`}
      onClick={onClick}
      style={{ ...style }}
    >
      {direction === 'left' ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

const OfferProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    axios.get('http://localhost:5000/item')
      .then(response => {
        const filteredProducts = response.data.filter(product => product.discount >= 15);
        const sortedProducts = filteredProducts.sort((a, b) => b.discount - a.discount);
        setProducts(sortedProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="shop-container mb-12 mt-20 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-4 text-pink-500 tracking-wide">Special Offers</h1>
      {/* <p className="text-center font-semibold text-lg text-blue-400 mb-8">{products.length} Items Available</p> */}

      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className="p-4">
            <Link to={`/product/${product.id}`}>
              <div className="flex flex-col p-4 border border-gray-200 shadow-lg rounded-xl 
                             hover:bg-blue-100 hover:scale-105 transition-transform duration-300 ease-in-out bg-white"
              >
                <div className="w-full h-40 mb-4 flex items-center justify-center">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>
                <h2 className="text-md font-semibold mb-2 text-center text-gray-900">{product.name}</h2>
                {/* <p className="text-center text-lg font-semibold text-gray-700 mb-4">₹ {product.price.toFixed(2)}</p> */}
                <p className="text-center text-lg font-semibold text-green-600 mb-2">{product.discount}% Off</p>

                <p className="text-center text-lg font-semibold text-yellow-500 mb-2">⭐ {product.stars}</p>

                <button className="mt-auto py-2 w-full text-white font-bold rounded-lg 
                                 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 
                                 shadow-md hover:shadow-xl"
                >
                  View Details
                </button>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OfferProducts;
