import React from "react";
import { Link } from "react-router-dom";
const AlsoLike = ({ products = [] }) => {
    if (products.length === 0) return null;
  
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="border p-2 rounded hover:shadow">
              <img src={p.base_image} alt={p.name} className="w-full h-32 object-cover mb-2" />
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-sm text-gray-600">${p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  export default AlsoLike;
  