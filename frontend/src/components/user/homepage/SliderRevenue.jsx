// SliderRevenue.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

import { getProducts } from '../../../api/products';
import Loader from '../../Loader';
import ProductCard2 from './../productDetail/ProductCard2';

const SliderRevenue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchTopRevenue = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        const data = res.data;

        const topRevenue = data
          .map(p => ({ ...p, revenue: (p.price || 0) * (p.sold || 0) }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 10);

        setProducts(topRevenue);
      } catch (err) {
        console.error("❌ Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRevenue();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader  />
      </div>
    );
  }

  if (!products.length) return null;

  return (
   <div>
     <div className="flex flex-col items-center pt-4 ">
    <img
      className="sm:w-15 sm:h-15 w-10 h-10"
      src="https://www.goodsmile.com/img/icon/limited.svg"
      alt="Top Revenue"
    />
    <p className="sm:text-lg text-sm font-semibold">Currently popular </p>
  </div>
    <div className="max-w-screen-lg mx-auto relative group">
     

      {products.length > 7 && (
        <div className="hidden sm:block ">
          <button
            ref={prevRef}
            className="absolute rotate-180 cursor-pointer -left-12 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-[70%] border border-[#F06E00] flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <img
              className="w-3"
              src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
              alt="prev"
            />
          </button>

          <button
            ref={nextRef}
            className="absolute rotate-0 cursor-pointer -right-12 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-[70%] border border-[#F06E00] flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <img
              className="w-3"
              src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
              alt="next"
            />
          </button>
        </div>
      )}

      <div className="px-4 sm:px-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerGroup={3}
          slidesPerView={3}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            1024: { slidesPerView: 4.5 },
          }}
        >
         {products.map((p, index) => (
  <SwiperSlide key={p.id} className="relative">
    <Link to={`/product/${p.id}`}>
      <div className="relative">
      <span
  className="absolute bottom-2 left-0 text-[#F06E00] font-bold text-7xl flex items-center justify-center z-10"
  style={{
    textShadow: `
      -2px -2px 0 #fff,
      2px -2px 0 #fff,
      -2px 2px 0 #fff,
      2px 2px 0 #fff
    `
  }}
>
  {index + 1}
</span>


        <ProductCard2 product={p} />
      </div>
    </Link>
  </SwiperSlide>
))}

        </Swiper>
      </div>
    </div>
   </div>
  );
};

export default SliderRevenue;
