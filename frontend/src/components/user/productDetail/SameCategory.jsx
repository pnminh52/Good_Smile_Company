import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import ProductCard2 from "./ProductCard2";
import { getProductsBySameCategory } from "../../../api/products";

const SameCategory = ({ product }) => {
  const [sameProducts, setSameProducts] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchSameCategory = async () => {
      if (!product?.id) return;
       console.log(product.category?.name)
      try {
        const { data } = await getProductsBySameCategory(product.id);
        setSameProducts(data || []);
      } catch (err) {
        console.error("❌ Error fetchSameCategory:", err.message);
      }
    };
    fetchSameCategory();
  }, [product]);

  if (!sameProducts.length) return null;

  return (
    <div className="max-w-screen-xl mx-auto ">
     
     <div className="pb-0 sm:text-xl text-lg px-4 sm:px-0 flex flex-col  sm:flex-row sm:gap-2 gap-0">
<h2 className="  font-semibold ">
More from this category
 </h2>

  {product.category_name && (
   
    
  <p className="uppercase  text-xl font-semibold text-blue-600">#{product.category_name}</p>
)}
      </div>
     
    <div className="relative group ">
     
    {sameProducts.length > 7 && (
    <div className="hidden sm:block">
        <button
          ref={prevRef}
          className="absolute rotate-180 cursor-pointer -left-5 top-20  -translate-y-1/2  z-10 
          bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img
          className="w-3"
            src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
            alt="prev"
          />
        </button>

        <button
          ref={nextRef}
          className="absolute rotate-0 cursor-pointer -right-5 top-20  -translate-y-1/2 z-10 
          bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img
          className="w-3"
            src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
            alt="next"
          />
        </button>
      </div>
    )}

      {/* Slider */}
      <div className="px-4 sm:px-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={3}
          loop={sameProducts.length > 4}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            1024: { slidesPerView: 7 },
          }}
        >
          {sameProducts
            .filter(Boolean)
            .map((p) => (
              <SwiperSlide key={p.id}>
                <Link to={`/product/${p.id}`}>
                  <ProductCard2 product={p} />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
    </div>
  );
};

export default SameCategory;
