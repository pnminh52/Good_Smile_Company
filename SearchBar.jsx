import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategories } from "./frontend/src/api/categories";

const SearchBar = ({ filteredProducts }) => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("Our Collection");

  useEffect(() => {
    let isMounted = true;
  
    if (categoryId) {
      getCategories(categoryId)
        .then(res => {
          if (isMounted) {
            if (res?.name) setCategoryName(res.name);
            else setCategoryName("Unknown Category"); // fallback nếu API trả về null
          }
        })
        .catch(() => {
          if (isMounted) setCategoryName("Unknown Category"); // fallback khi API lỗi
        });
    } else {
      setCategoryName("Our Collection");
    }
  
    return () => { isMounted = false; };
  }, [categoryId]);
  
  
  

  return (
    <div>
      <div className="w-full sm:py-6 py-4">
        <p className="gap-1">
          <span className="text-2xl font-semibold">{categoryName}</span>{" "}
          <span className="text-gray-600 text-lg">({filteredProducts.length})</span>
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
