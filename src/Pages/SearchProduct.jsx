import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchResult from "./SearchResult";

const SearchProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/item");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems([]);
    } else {
      const results = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(results);
    }
  }, [searchQuery, items]);

  return (
    <div className="search-product p-4">
      <h1 className="text-2xl font-bold">Search Results:</h1>
      <SearchResult filteredItems={filteredItems} />
    </div>
  );
};

export default SearchProduct;
