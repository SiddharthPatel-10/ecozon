import React, { useState } from 'react';
import axios from 'axios';

const Navbar = ({ setProducts }) => {
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:4000/api/v1/product/filter', {
        params: { price, brand, rating }
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching filtered products', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 rounded-lg shadow-lg">
      <form onSubmit={handleFilter} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 w-full md:w-auto"
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 w-full md:w-auto"
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 w-full md:w-auto"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Filter
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
