import React, { useEffect, useState, useRef } from "react";
import SliderSkeleton from "./SliderSkeleton"; 

const History = ({ product }) => {
  const [historyProducts, setHistoryProducts] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (!product) return;

    const stored = localStorage.getItem("historyProducts");
    let history = stored ? JSON.parse(stored) : [];

    // loại bỏ trùng
    history = history.filter((p) => p.id !== product.id);
    // thêm sản phẩm mới lên đầu
    history.unshift(product);
    // giữ tối đa 10 sản phẩm
    if (history.length > 10) history = history.slice(0, 10);

    localStorage.setItem("historyProducts", JSON.stringify(history));
    setHistoryProducts(history);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  if (!historyProducts.length) return null;

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="sm:text-xl text-md font-semibold px-4 sm:px-0">
        Recently Viewed
      </h2>

      <SliderSkeleton
        products={historyProducts}
        prevRef={prevRef}
        nextRef={nextRef}
      />
    </div>
  );
};

export default History;
