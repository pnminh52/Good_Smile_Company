import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import ProductCard2 from "./ProductCard2";
import { getRecommendedProducts } from "../../../api/products";
const RecommendProduction  = ({ product }) => {
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
    <div className="max-w-screen-xl mx-auto relative group ">
     


<div className="sm:text-xl text-lg px-4 sm:px-0 flex flex-col  sm:flex-row sm:gap-2 gap-0">
<h2 className="  font-semibold ">
Recommended from the same series 
 </h2>
  {product.series && (
   
    
  <p className="uppercase font-semibold text-blue-600">#{product.series}</p>
)}
      </div>
<div className="relative group ">

{
  recommended.length>7 && (
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
  )
}

      

      {/* Slider */}
      <div className="px-4 sm:px-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={3}
          loop={recommended.length > 4}
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
          {recommended
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

export default RecommendProduction ;
