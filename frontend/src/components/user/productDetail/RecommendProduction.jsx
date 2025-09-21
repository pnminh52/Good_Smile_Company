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
      <h2 className="text-2xl font-semibold py-4 px-4 sm:px-0">
        Recommended from the same series
      </h2>

      {/* Navigation buttons (desktop only) */}
      <div className="hidden sm:block">
        <button
          ref={prevRef}
          className="absolute rotate-180 -left-5 top-1/2 -translate-y-1/2 z-10 
          bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img
            src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
            alt="prev"
          />
        </button>

        <button
          ref={nextRef}
          className="absolute rotate-0 -right-5 top-1/2 -translate-y-1/2 z-10 
          bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img
            src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
            alt="next"
          />
        </button>
      </div>

      {/* Slider */}
      <div className="px-4 sm:px-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={2}
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
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
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
  );
};

export default RecommendProduction ;
