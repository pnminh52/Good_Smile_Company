import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState, useEffect } from "react";

const images = [
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/325/d39ee5dab288330a565afbde445041d7.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/325/01733b9cb3487f8bbc97b31868ced590.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/313/9dac36db98e207f479e5fe4266b3e3a8.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/313/f974d8ead6c809b0090aa1ad5be62802.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/321/14faa0d2f05307b0dea9a4d566930fbf.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/321/1ff3e79cfd69e7d431bb0a062c6727a6.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/322/c647b72b06761d1cff83abf1944f1384.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/322/63dd663e29e0c8b9b3ccbdd9c0499f33.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/320/d398eed4a3f1752525355232e36de551.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/320/2d1444a3632c24e098b6fcac0cf02f82.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/309/947a43c3fc1a0458b1db5e7906da4d39.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/309/44a9caf06ac35b96bffcad0a9f52e4e5.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/306/60dabdc9b284425b1e332b86db721ccf.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/306/62756daa69355d097b3fbc3603c13368.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/303/ff150f6a785943547573e6dce622c925.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/303/21dcd9af597c2b25a9c98e9f9f3d5b99.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/316/4b7bd0c72b54404e7e1ba4499ab3f964.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/316/ffe250f8dd1e2be6fc3dd75d2017a811.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/314/e0d5a258719377017c3f0e1597dcb83f.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/314/6ab1e5de255565e7bbca049b65d85685.jpg",
  },
  {
    small:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/308/61d73fad9d4dd477dc807a38c1f3cde6.jpg",
    large:
      "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/308/bd4a8f5636c1df0414f30628d4f9d567.jpg",
  },
];
const ResponsiveImage = ({ small, large }) => (
  <picture>
    <source media="(max-width: 959.98px)" srcSet={small} />
    <source media="(min-width: 960px)" srcSet={large} />
    <img
      src={small}
      loading="lazy"
      className="w-full sm:h-full rounded-sm h-auto  object-cover "
    />
  </picture>
);
const SliderBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef =useRef(null)
  const progressRefs = useRef([]);
  useEffect(() => {
    let interval;
    const activeBar = progressRefs.current[activeIndex];
    let width = 0;

    // Reset tất cả
    progressRefs.current.forEach((bar, idx) => {
      if (bar) bar.style.width = idx === activeIndex ? "0%" : "0%";
    });

    interval = setInterval(() => {
      if (width >= 100) return;
      width += 0.5;
      if (activeBar) activeBar.style.width = `${width}%`;
    }, 25);

    return () => clearInterval(interval);
  }, [activeIndex]);

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
              slidesPerView: 1.2,
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
          className=""
        >
          {images.map((img, i) => (
            <SwiperSlide
              key={i}
              
              className="transition-all duration-300 relative"
            >
              {({ isActive }) => (
                <div className="relative transition duration-300 ease-in-out cursor-pointer border-3 border-transparent rounded-lg hover:border-[#EE7800] overflow-hidden">
                  {" "}
                  <ResponsiveImage {...img} />
                  {/* Overlay */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 bg-opacity-50 transition-all duration-300"></div>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom nút prev/next */}
        <div className="hidden lg:block">
          <button className="cursor-pointer custom-prev absolute top-1/2 left-47 z-10 -translate-y-1/2 p-6 bg-white  rounded-full shadow hover:bg-gray-100">
            <img
              className="rotate-180 w-4 h-4 "
              src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
              alt=""
            />
          </button>
          <button className="cursor-pointer custom-next absolute top-1/2 right-47 z-10 bg-white -translate-y-1/2 p-6 rounded-full shadow hover:bg-gray-100">
            <img
              className=" w-4 h-4 "
              src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
              alt=""
            />
          </button>
        </div>
        <div className="absolute -bottom-4.5 left-0 right-0 flex justify-center z-50 gap-2 px-4">
  {images.map((_, i) => (
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