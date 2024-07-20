import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <SearchBar setProducts={setProducts} />
      <div className="p-6">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default App;
