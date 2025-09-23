import React, { useState, useEffect } from "react";
import DetailSection from './DetailSection';
import { Image } from "antd";
const LeftSide = ({ product }) => {
  const [mainImage, setMainImage] = useState(
    product.additional_images?.[0] || product.base_image
  );

  useEffect(() => {
    setMainImage(product.additional_images?.[0] || product.base_image);
  }, [product]);

  return (
  <div>
     <div className="hidden sm:block">
     <div className="flex gap-4">
      {/* List ảnh phụ - scroll dọc */}
     <div className="hidden sm:block">
       {product.additional_images?.length > 0 && (
              <div className="w-16 h-[400px] hide-scrollbar overflow-y-auto flex flex-col gap-2 pr-1">
                {product.additional_images.map((img, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 bg-gray-100 flex items-center justify-center  cursor-pointer  
                    
                    `}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Additional ${i}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
     </div>

      {/* Ảnh chính */}
      <div className="flex-1">
  <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
    <Image
      src={mainImage}
      alt={product.name}
      style={{ maxWidth: "100%", maxHeight: "600px", objectFit: "cover" }}
      preview={{ mask: <span>Click to enlarge</span> }}
    />
  </div>
</div>

      {/* Ảnh phụ cho mobile */}
<div className="block sm:hidden mt-2">
  {product.additional_images?.length > 0 && (
    <div className="w-full overflow-hidden">
      <div className="flex gap-2">
        {product.additional_images.map((img, i) => (
          <div
            key={i}
            className="w-16 h-16 bg-gray-100 flex items-center justify-center cursor-pointer"
            onClick={() => setMainImage(img)}
          >
            <img
              src={img}
              alt={`Additional ${i}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )}
</div>


    </div>
   <DetailSection product={product} />
   </div>
   <div className="block sm:hidden">
   <div className="flex flex-col sm:flex-row gap-4">
      {/* List ảnh phụ */}
      <div className="hidden sm:flex sm:flex-col lg:flex-col w-16 h-[400px] lg:h-[500px] hide-scrollbar overflow-y-auto gap-2">
        {product.additional_images?.map((img, i) => (
          <div
            key={i}
            className="w-16 h-16 bg-gray-100 flex items-center justify-center cursor-pointer"
            onClick={() => setMainImage(img)}
          >
            <img
              src={img}
              alt={`Additional ${i}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Ảnh chính */}
      <div className="flex-1 w-full">
       <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
           <Image
             src={mainImage}
             alt={product.name}
             style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "cover" }}
             preview={{ mask: <span>Click to enlarge</span> }}
           />
         </div>

        {/* Ảnh phụ cho tablet/mobile - scroll ngang */}
        <div className="flex sm:hidden mt-2 overflow-x-auto hide-scrollbar gap-2">
          {product.additional_images?.map((img, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-gray-100 flex items-center justify-center cursor-pointer flex-shrink-0"
              onClick={() => setMainImage(img)}
            >
              <img
                src={img}
                alt={`Additional ${i}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

    </div>

   </div>
  </div>
  );
};

export default LeftSide;
