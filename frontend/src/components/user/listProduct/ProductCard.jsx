import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ products, columns = 4 }) => {
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  return (
    <div>
      <div
        className={`grid  sm:gap-4 gap-2 ${
          columnClasses[columns] || columnClasses[4]
        }`}
      >
        {products.slice().map((p) => (
          <Link to={`/product/${p.id}`} key={p.id} className="flex flex-col">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <img
                src={p.base_image}
                alt={p.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-full py-1 flex space-y-1 justify-center items-center">
              <img
                className="w-15 sm:w-20 h-auto object-cover"
                src={p.imagecopyright}
                alt=""
              />
            </div>

            <div>
              <div className="flex items-center sm:gap-2 gap-1">
                {p.stock > 0 && p.stock < 50 && (
                  <p className="bg-red-200 px-2 inline-block text-xs text-red-700 rounded-full">
                    Few left
                  </p>
                )}

                {p.stock === 0 && (
                  <p className="bg-gray-200 px-2 inline-block text-xs text-gray-700 rounded-full">
                    Sold out
                  </p>
                )}
                {p.status === "available" && (
                  <p className="bg-green-200 px-2 inline-block text-xs text-green-700 rounded-full">
                    Available
                  </p>
                )}
                {p.status === "preorder" && (
                  <p className="bg-green-200 px-2 inline-block text-xs text-green-700 rounded-full">
                    Preorders
                  </p>
                )}

                {p.gift_items && p.gift_items.length > 0 && (
                  <p className="bg-yellow-200 px-2 inline-block text-xs text-yellow-700 rounded-full">
                    W/Bonus
                  </p>
                )}
              </div>

              <h2 className="font-semibold text-sm pt-1 pb-0">{p.name}</h2>
              <p className="text-gray-600 text-sm">
                {Number(p.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                / {Number(p.sold).toLocaleString("vi-VN")} sold
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
