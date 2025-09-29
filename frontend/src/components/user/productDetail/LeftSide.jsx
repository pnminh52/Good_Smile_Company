import React, { useState, useEffect } from "react";
import DetailSection from './DetailSection';
import { Image } from "antd";
const LeftSide = ({ product }) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const images = product.additional_images?.length > 0
    ? product.additional_images
    : [product.base_image];
  const [mainImage, setMainImage] = useState(images[0]);
  useEffect(() => {
    const imgs = product.additional_images?.length > 0
      ? product.additional_images
      : [product.base_image];
    setCurrentIndex(0);
    setMainImage(imgs[0]);
  }, [product]);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex]);
  };

  return (
    <div>
      <div className="hidden sm:block">
        <div className="flex gap-4">
          <div className="hidden lg:block">
            {product.additional_images?.length > 0 && (
              <div className="w-16 h-[400px] hide-scrollbar overflow-y-auto flex flex-col gap-2 pr-1">
                {product.additional_images.map((img, i) => {
                  const isSelected = img === mainImage;
                  return (
                    <div
                      key={i}
                      className={`w-16 bg-gray-100 h-16 flex items-center justify-center cursor-pointer transition-all rounded-sm ease-in-out duration-300
              ${isSelected ? "border-2 border-[#F06E00]" : "border border-gray-100"}`}
                      onClick={() => setMainImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Additional ${i}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        


          {/* Ảnh chính */}
          <div className="flex-1">
            <div className="w-full h-[600px] relative bg-gray-100 flex items-center justify-center">
              <div key={mainImage} className="w-full h-full flex items-center justify-center duration-300 ease-in-out animate-fade">

                <Image
                  src={mainImage}
                  alt={product.name}
                  style={{ maxWidth: "100%", maxHeight: "600px", objectFit: "cover" }}
                  preview={{ mask: <span>Click to enlarge</span> }}
                /></div>
                <div className="hidden lg:block">
                <div className="absolute  bottom-4 right-4 flex gap-2 items-center">
                <button onClick={() => handlePrev()} className="cursor-pointer bg-white w-10 h-10 rounded-full left-0 text-[#F06E00] flex items-center justify-center z-10">
                  <img
                    className="w-3 rotate-180"
                    src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
                    alt="prev"
                  />
                </button>
                <button onClick={() => handleNext()} className="cursor-pointer bg-white w-10 h-10 rounded-full left-0 text-[#F06E00]  flex items-center justify-center z-10">
                  <img
                    className="w-3"
                    src="https://www.goodsmile.com/img/icon/arrow-paging.svg"
                    alt="prev"
                  />
                </button>
              </div>
                </div>
             
            </div>
          </div>





        </div>
        <div className="block lg:hidden px-4 mt-4">
  {product.additional_images?.length > 0 && (
    <div className="hide-scrollbar overflow-x-auto flex gap-2 pb-2">
      {product.additional_images.map((img, i) => {
        const isSelected = img === mainImage;
        return (
          <div
            key={i}
            className={`w-1/5 h-auto aspect-square  bg-gray-100 flex-shrink-0 flex items-center justify-center cursor-pointer transition-all rounded-sm ease-in-out duration-300
              ${isSelected ? "border-2 border-[#F06E00]" : "border border-gray-100"}`}
            onClick={() => setMainImage(img)}
          >
            <img
              src={img}
              alt={`Additional ${i}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );
      })}
    </div>
  )}
</div>
      <div className="hidden lg:block">
      <DetailSection product={product} />
      </div>
      </div>
      <div className="block sm:hidden">
        <div className="flex flex-col sm:flex-row gap-4">
    
          <div className="flex-1 w-full">
            <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
              <div key={mainImage} className="w-full  h-full flex items-center justify-center relative duration-300 ease-in-out animate-fade">
                <Image
                  src={mainImage}
                  alt={product.name}
                  style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "cover" }}
                  preview={{ mask: <span>Click to enlarge</span> }}
                />
            
              </div>
            </div>

            <div className="flex sm:hidden mt-2 overflow-x-auto hide-scrollbar gap-2">
              {product.additional_images?.map((img, i) => {
                const isSelected = img === mainImage;
                return (
                  <div
                    key={i}
                    className={`w-16 h-16 flex-shrink-0 flex items-center justify-center cursor-pointer transition-all rounded-sm ease-in-out duration-300
          ${isSelected ? "border-2 border-[#F06E00]" : "border border-gray-100"} bg-gray-100`}
                    onClick={() => {
                      setMainImage(img);
                      setCurrentIndex(i);
                    }}

                  >
                    <img
                      src={img}
                      alt={`Additional ${i}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LeftSide;
