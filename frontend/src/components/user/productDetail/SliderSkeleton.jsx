// SliderSkeleton.jsx
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import ProductCard2 from "./ProductCard2";

const SliderSkeleton = ({ products, prevRef, nextRef }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="relative group">
      {products.length > 7 && (
        <div className="hidden lg:block">
          <button
            ref={prevRef}
            className="absolute rotate-180 cursor-pointer -left-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <img
              className="w-3"
              src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
              alt="prev"
            />
          </button>

          <button
            ref={nextRef}
            className="absolute rotate-0 cursor-pointer -right-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <img
              className="w-3"
              src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
              alt="next"
            />
          </button>
        </div>
      )}

      <div className="px-4 lg:px-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={3}
          loop={products.length > 4}
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
            768: { slidesPerView: 7 },
          }}
        >
          {products.filter(Boolean).map((p) => (
            <SwiperSlide key={p.id}>
              <Link to={`/product/${p.id}`}>
                <ProductCard2 product={p} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderSkeleton;
