import { Link } from 'react-router-dom';

const SearchResult = ({ filteredItems }) => {
  return (
    <div className="search-results w-auto bg-blue-100 mt-20 p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Search Results:</h1>

      {filteredItems.length > 0 ? (
        filteredItems.map(item => (
          <div
            key={item.id}
            className="product-item p-4 mb-4 border-b border-gray-300 flex gap-4 items-center"
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-32 h-32 object-contain rounded-md shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-pink-500 font-bold">₹ {item.price}/-</p>
              <p className="text-pink-500 font-bold">⭐ {item.stars}</p>

              <Link to={`/product/${item.id}`}>
                <button className="mt-auto mb-auto w-36 px-4 py-2 text-white font-bold rounded bg-blue-500 hover:bg-blue-600">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
};

export default SearchResult;
