import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-t-lg">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-lg font-bold mb-2">₹ {product.price}</p>
                <p className="text-sm text-gray-600">Brand: {product.brand}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
