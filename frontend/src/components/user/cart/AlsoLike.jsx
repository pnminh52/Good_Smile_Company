import React, { useEffect, useState, useRef } from "react";
import SliderSkeleton from "../productDetail/SliderSkeleton";


const AlsoLike = ({ products }) => {

  const prevRef = useRef(null);
  const nextRef = useRef(null);


  return (
 <div className="">
    
         <h2 className="font-semibold text-xl pt-4 px-4 lg:px-0 ">Maybe you also like?</h2>
    
   
 
       <SliderSkeleton
         products={products}
         prevRef={prevRef}
         nextRef={nextRef}
       />
     </div>
  );
};

export default AlsoLike;
