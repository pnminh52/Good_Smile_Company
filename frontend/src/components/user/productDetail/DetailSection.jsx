import React, { useState } from "react";
import { Image } from "antd";
const Dropdown = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="lg:px-0  sm:px-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex relative border-b-3 border-gray-300 justify-between items-center py-3 font-semibold text-lg"
      >
        <span className="relative">
          {title}
          {/* gạch cam */}
          <span className="absolute left-0 -bottom-[14px] w-1/2 h-[3px] bg-[#FF6624] rounded"></span>
        </span>
      </button>
  
      {open && <div className="text-black">{children}</div>}
    </div>
  );
  
};

const DetailSection = ({ product }) => {
  return (
    <div className=" ">
      {/* Where to Purchase */}
     {
      product.gift_items.length>0 && (
        <Dropdown title={"Good Smile Company Bonus"} defaultOpen={true}>
        {
        product.gift_items.map((gift, index) => (
          <div key={index} className="flex flex-col gap-0  ">
            <div className="pt-2 pb-4">
 {gift.title && <p className=" text-black ">{gift.title}</p>}
            {gift.description && <p>{gift.description}</p>}
            </div>
                       

            {gift.image && (
             <div className="flex items-center justify-center p-6 bg-gray-100">
               <Image
                src={gift.image}
                alt={gift.title || `Gift ${index + 1}`}
                className="w-[150px] h-auto object-cover "
              />
             </div>
            )}
          </div>
        ))
        
        }
      </Dropdown>
      )
     }
      <Dropdown title="Where to Purchase" defaultOpen={true}>
      
        <ul className="  space-y-3 py-3">
          <li>
            *All orders placed on the Good Smile Company Online Store during the
            specified preorder period are guaranteed to be fulfilled.
          </li>
          <li>
            *Please note that this does not apply to orders with incorrect
            payment and/or shipping information provided.
          </li>
          <li>
            *Dates and times listed are in Japan Standard Time (JST) unless
            otherwise stated.
          </li>
        </ul>
       
        <ul className=" space-y-3 ">
          <li>*This product is available from our partner shops.</li>
          <li>
          *Please see the following listing to find a partner shop in your
            area: Partner Shop Listing
          </li>
        </ul>
      </Dropdown>

      {/* Product Specifications */}
      <Dropdown title="Product Specifications">
        {product.series && (
          <div className="flex items-center gap-10 py-6 border-b border-gray-200">
            <p className="font-semibold text-black">Series</p>
            <p>{product.series}</p>
          </div>
        )}
        {product.specifications && (
          <div className="flex items-center gap-10 py-6 border-b border-gray-200">
            <p className="font-semibold text-black">Specifications</p>
            <p>{product.specifications}</p>
          </div>
        )}
        {product.sculptor && (
          <div className="flex items-center gap-10 py-6 border-b border-gray-200">
            <p className="font-semibold text-black">Sculptor</p>
            <p>{product.sculptor}</p>
          </div>
        )}
        {product.paintwork && (
          <div className="flex items-center gap-10 py-6 border-b border-gray-200">
            <p className="font-semibold text-black">Paintwork</p>
            <p>{product.paintwork}</p>
          </div>
        )}
        {product.relatedInfo && (
          <div className="flex items-center gap-10 py-6 border-b border-gray-200">
            <p className="font-semibold text-black">Related Information</p>
            <p>{product.relatedInfo}</p>
          </div>
        )}
        {product.manufacturer && (
          <div className="flex items-center gap-10 py-6 border-b border-gray-200">
            <p className="font-semibold text-black">Manufacturer</p>
            <p>{product.manufacturer}</p>
          </div>
        )}
        {product.distributedby && (
          <div className="flex items-center gap-10 py-6 border-b border-gray-200">
            <p className="font-semibold text-black">Distributed by</p>
            <p>{product.distributedby}</p>
          </div>
        )}
          {product.copyrightseries && (
          <div className="flex items-center gap-10 py-6 ">
            <p>{product.copyrightseries}</p>
          </div>
        )}
      </Dropdown>
      <Dropdown  title="Considerations" defaultOpen={true}>
        <p className="font-semibold text-lg pt-4 pb-3">About This Product</p>
        <ul className="space-y-2">
          <li className="text-md ">Images shown are sample prototypes. Some specifications may differ from the actual product.</li>
          <li className="text-md ">Paintwork is done partially by hand and therefore final products may vary.</li>
          <li className="text-md ">This product does not balance on its own. Please use the included stand.</li>
          <li className="text-md ">Important announcement: <span className="text-blue-600 underline">Cancellation of Packaging Design Change</span></li>
        </ul>
        <p className="font-semibold text-lg pt-4 pb-3">About Orders for This Product</p>
        <ul className="space-y-2">
          <li className="text-md ">Purchases are limited to 3 per person.</li>
          <li className="text-md ">Preorders for this item may close during the preorder period without prior notice.</li>
          <li className="text-md ">Payment for pre-ordered items made with a credit card or PayPal will be processed 2–3 weeks before the confirmed shipping date (except for Taiwan). However, for some high-priced items, payment may be required at the time of order, even if using a credit card or PayPal.</li>
          <li className="text-md text-red-600">Items may not be available for purchase depending on your region. Please log in or check with your local partner shop for item availability.</li>
        </ul>
      </Dropdown>
    </div>
  );
};

export default DetailSection;
