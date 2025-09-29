import React from "react";
import { useNavigate } from "react-router-dom";
const PriceTable = ({ total, shippingFee, handleCodPayment }) => {
  const navigate =useNavigate()
  return (
    <div>
      <div className="py-4 space-y-4">
        <div className="border-t space-y-2 py-2 border-b border-gray-300 ">
          <div className="flex itemx-center justify-between">
            <p>Subtotal</p>
            <p>
              {total.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="flex items-center justify-between">
          <p >
            Shipping{" "}
           
          </p>
          <p>
             {shippingFee === null
                          ? "..."
                          : shippingFee.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
          </p>
          </div>

          <div className="flex font-semibold items-center justify-between">
  <p >
            Grand Total{" "}
           
          </p>
          <p>
          {shippingFee === null
              ? "..."
              : (total + shippingFee).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}

          </p>
          </div>

        
        
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-4 gap-2 items-center ">
        
        <button
  onClick={handleCodPayment}
  disabled={shippingFee === null || shippingFee === 0}
  className={`w-full py-3 transition duration-300 ease-in-out rounded-full font-semibold 
    ${shippingFee === null || shippingFee === 0
      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
      : "bg-[#FF6900] text-white cursor-pointer"}
  `}
>
  Pay with COD
</button>

     
          <button onClick={()=>navigate("/cart")} className="bg-[#FFF] text-[#FF6624]  w-full py-3 rounded-full cursor-pointer border  border-[#FF6624] font-semibold">
                     Back to Cart
                   </button>
         
        </div>
      </div>
    </div>
  );
};

export default PriceTable;
