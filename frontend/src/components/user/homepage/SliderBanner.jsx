import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getBanners } from './../../../api/banner';
import { useNavigate } from "react-router-dom";

const ResponsiveImage = ({ small, large }) => (
  <picture>
    <source media="(max-width: 959.98px)" srcSet={small} />
    <source media="(min-width: 960px)" srcSet={large} />
    <img
      src={small}
      loading="lazy"
      className="w-full sm:h-full rounded-sm h-auto object-cover"
    />
  </picture>
);

const SliderBanner = () => {
  
  const navigate =useNavigate()
  const handleClickBanner = (link, navigate) => {
    if (!link) return;
  
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank"); 
    } else {
      navigate(link);
    }
  };
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await getBanners();
        setBanners(data); // lấy từ API
      } catch (error) {
        console.error("❌ Lỗi load banners:", error);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div className="bg-[#333333] pt-4 pb-8 flex justify-center overflow-visible relative h-full">
      <div className="relative w-full h-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          slidesPerView={1.5}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
            },
            768: {
              slidesPerView: 1.5,
            },
          }}
          centeredSlides={true}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
        >
          {banners
          .filter((banner)=>banner.status==="active")
          .map((banner, i) => (
            <SwiperSlide key={banner.id || i} className="transition-all duration-300 relative">
              {({ isActive }) => (
                <div  className="relative transition duration-300 ease-in-out cursor-pointer border-3 border-transparent rounded-lg hover:border-[#EE7800] overflow-hidden">
                  <ResponsiveImage
                    small={banner.image_mobile}
                    large={banner.image_desktop}
                  />
                  {/* Overlay */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40  transition-all duration-300"></div>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nút prev/next */}
        <div className="hidden md:block">
          <button className="cursor-pointer custom-prev absolute top-1/2 left-47 z-10 -translate-y-1/2 p-6 bg-white rounded-full shadow hover:bg-gray-100">
            <img
              className="rotate-180 w-4 h-4"
              src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
              alt="prev"
            />
          </button>
          <button className="cursor-pointer custom-next absolute top-1/2 right-47 z-10 bg-white -translate-y-1/2 p-6 rounded-full shadow hover:bg-gray-100">
            <img
              className="w-4 h-4"
              src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
              alt="next"
            />
          </button>
        </div>

        {/* Chấm progress */}
        <div className="absolute -bottom-4.5 left-0 right-0 flex justify-center z-50 gap-2 px-4">
          {banners
          .filter((banner)=>banner.status==="active")
          .map((_, i) => (
            <div
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`h-2 cursor-pointer rounded-full transition-all duration-500 ease-in-out 
                ${activeIndex === i ? "w-10 bg-[#F06E00]" : "w-2 bg-white"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderBanner;
