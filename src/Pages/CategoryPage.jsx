import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams(); 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/item');
        const data = await response.json();

        const filteredItems = data.filter(item => 
          item.category.toLowerCase() === category.toLowerCase()
        );
        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryItems();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  let content;

  if (items.length > 0) {
    content = (
      <div className="category-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 p-4">
        {items.map(item => (
          <div 
            key={item.id}
            className="flex flex-col relative p-4 border shadow-lg rounded-md hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300 bg-pink-100 hover:bg-blue-200"
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-64 object-contain rounded-md"
            />
            <h3 className="text-lg font-bold mt-2 text-center">{item.name}</h3>
            <p className="text-green-500 font-semibold mt-1 text-center">₹{item.price}/-</p>
            <p className="text-green-500 font-semibold mt-1 text-center">⭐{item.stars}</p>
            <Link to={`/product/${item.id}`}> 
              <button
                className="mt-auto w-full px-4 py-2 text-white font-bold rounded bg-blue-500 hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="flex items-center h-52 justify-center">
        <p className="text-4xl font-bold text-center mt-96 mb-64">No items available in this category.</p>
      </div>
    );
  }

  return (
    <div className="category-page-container">
      {content}
    </div>
  );
};

export default CategoryPage;
