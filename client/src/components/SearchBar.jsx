import React, { useState } from "react";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "./FilterSidebar";

const SearchBar = ({ setProducts }) => {
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/product/search`, { params: { query } });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleFilter = (filteredProducts) => {
    console.log("Filtered products:", filteredProducts); // Debugging: Check filtered data
    setProducts(filteredProducts);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="bg-white p-4 rounded shadow-lg flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => setShowFilter(!showFilter)}
          className="ml-4 p-2 text-gray-600 hover:text-gray-900"
        >
          <FaFilter size={20} />
        </button>
      </form>
      {showFilter && <FilterSidebar onClose={() => setShowFilter(false)} onFilter={handleFilter} />}
    </div>
  );
};

export default SearchBar;
