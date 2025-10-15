import React, { useEffect, useState, useRef } from "react";
import SliderSkeleton from './SliderSkeleton';
import { getProductsBySameCategory } from "../../../api/products";
import Loader from './../../Loader';

const SameCategory = ({ product }) => {
  const [sameProducts, setSameProducts] = useState([]);
  const [loading, setLoading]=useState(false)
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchSameCategory = async () => {
      if (!product?.id) return;
      try {
        setLoading(true)
        const { data } = await getProductsBySameCategory(product.id);
        setSameProducts(data || []);
      } catch (err) {
        console.error("❌ Error fetchSameCategory:", err.message);
      } finally{
        setLoading(false)
      }
    };
    fetchSameCategory();
  }, [product]);

  if (!sameProducts.length) return null;
  if (loading) return <><Loader /></>

  return (
    <div className="max-w-screen-xl mx-auto ">
      <div className="pb-0 sm:text-xl text-md px-4 sm:px-0 flex  sm:flex-row sm:gap-2 gap-2">
        <h2 className="font-semibold hidden sm:block">More from this category</h2>
        {product.category_name && (
         <div className="flex items-center gap-1">
           <p className=" font-semibold text-blue-600">
                      #{product.category_name}
                    </p>
                    <p className="block sm:hidden font-semibold">category</p>
         </div>
        )}
      </div>

      <SliderSkeleton
  products={sameProducts}
  prevRef={prevRef}
  nextRef={nextRef}
/>

    </div>
  );
};

export default SameCategory;
