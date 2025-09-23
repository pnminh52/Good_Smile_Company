import React, { useEffect, useState, useRef } from "react";
import SliderSkeleton from "./SliderSkeleton"; 
import { getRecommendedProducts } from "../../../api/products";

const RecommendProduction = ({ product }) => {
  const [recommended, setRecommended] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchRecommended = async () => {
      if (!product?.id) return;
      try {
        const { data } = await getRecommendedProducts(product.id);
        setRecommended(data || []);
      } catch (err) {
        console.error("❌ Error fetchRecommended:", err.message);
      }
    };
    fetchRecommended();
  }, [product]);

  if (!recommended.length) return null;

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="sm:text-xl text-lg px-4 sm:px-0 flex flex-col sm:flex-row sm:gap-2 gap-0">
        <h2 className="font-semibold">Recommended from the same series</h2>
        {product.series && (
          <p className="uppercase font-semibold text-blue-600">#{product.series}</p>
        )}
      </div>

      <SliderSkeleton
        products={recommended}
        prevRef={prevRef}
        nextRef={nextRef}
      />
    </div>
  );
};

export default RecommendProduction;
