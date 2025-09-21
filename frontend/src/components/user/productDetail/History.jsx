import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import ProductCard2 from "./ProductCard2";

const History = ({ product }) => {
  const [historyProducts, setHistoryProducts] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (product) {
      const stored = localStorage.getItem("historyProducts");
      let history = stored ? JSON.parse(stored) : [];
      window.scrollTo({ top: 0, behavior: "smooth" });

      // loại bỏ trùng
      history = history.filter((p) => p.id !== product.id);
      // thêm sản phẩm mới nhất lên đầu
      history.unshift(product);
      // giữ tối đa 10 sản phẩm
      if (history.length > 10) history = history.slice(0, 10);

      localStorage.setItem("historyProducts", JSON.stringify(history));
      setHistoryProducts(history);
    }
  }, [product]);

  if (!historyProducts.length) return null;

  return (
    <div className="max-w-screen-xl mx-auto relative group">
      

     <h2 className="text-2xl font-semibold pb-4 px-4 sm:px-0">
     Recently Viewed
  </h2>
    <div className="relative group ">
     

      {/* Navigation buttons (desktop only) */}
      <div className="hidden sm:block">
        <button
          ref={prevRef}
          className="absolute rotate-180 cursor-pointer -left-5 bottom-1/2 -translate-y-1/2  z-10 
          bg-white shadow-md w-14 h-14 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img
          className="w-3"
            src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
            alt="prev"
          />
        </button>

        <button
          ref={nextRef}
          className="absolute rotate-0 cursor-pointer -right-5 bottom-1/2 -translate-y-1/2 z-10 
          bg-white shadow-md w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img
          className="w-3"
            src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
            alt="next"
          />
        </button>
      </div>


     <div className="px-4 sm:px-0">
     <Swiper
        modules={[Navigation]}
        spaceBetween={8}
        slidesPerView={2}
        loop={historyProducts.length > 4}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        
      >
        {historyProducts
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

export default History;
