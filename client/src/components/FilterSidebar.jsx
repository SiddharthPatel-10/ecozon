import React, { useState } from "react";
import axios from "axios";

const FilterSidebar = ({ onClose, onFilter }) => {
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/product/filter', {
        params: { price, brand, rating }
      });
      // Pass the filtered products to the parent component
      onFilter(response.data.products);
      onClose(); // Close the sidebar after filtering
    } catch (error) {
      console.error('Error fetching filtered products', error);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-64 bg-white shadow-lg h-full z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="p-4">
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900 mb-4">
          Close
        </button>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Price</label>
            <input
              type="number"
              placeholder="Max Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Rating</label>
            <input
              type="number"
              placeholder="Min Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <button
            type="button"
            onClick={handleFilter}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
