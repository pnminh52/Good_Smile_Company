import React from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hook/useToast";
import NotiAlert from "./NotiAlert";
import { useState } from "react";
const PriceTable = ({ total, shippingFee, handleCodPayment, handleVnpayPayment, loading }) => {
  const toast = useToast()
  const navigate = useNavigate();
  const [open, setOpen]=useState(false)
  const upComingFeatured=()=>{
    toast.info("Upcoming feature!")
  }
  const handleCloseModal =()=>{
    setOpen(false)
  }
  return (
    <div className="py-4 space-y-4">
      <div className="border-t space-y-2 py-2 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p>{total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p>{shippingFee === null ? "..." : shippingFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
        </div>
        <div className="flex font-semibold items-center justify-between">
          <p>Grand Total</p>
          <p>{shippingFee === null ? "..." : (total + shippingFee).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
        </div>
      </div>
      <p className="text-xl font-semibold">Payment method & Other actions</p>
      <div className="flex flex-col  lg:gap-2 gap-1 items-center">
       
       <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-2 items-center">
         <button
          onClick={handleCodPayment}
          disabled={shippingFee === null || shippingFee === 0 || loading}
          className={`w-full py-3 rounded-full font-semibold transition duration-300 ease-in-out 
            ${shippingFee === null || shippingFee === 0 || loading ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-[#FF6900] text-white cursor-pointer"}`}
        >
          {loading ? "Processing..." : "Cash on Delivery"}
        </button>

        <button
         onClick={handleVnpayPayment}
          disabled={shippingFee === null || shippingFee === 0 || loading}
          className={`w-full h-12 rounded-full font-semibold transition duration-300 ease-in-out 
            ${shippingFee === null || shippingFee === 0 || loading ? "bg-gray-100 border-blue-200 flex items-center justify-center text-gray-500 cursor-not-allowed" : "bg-[#FFF] border-blue-500 border rounded-full flex items-center justify-center text-white cursor-pointer"}`}
        >
          {loading ? "" : (
          <img className="w-25" src="./vnpay.png" alt="" />

          )}
        </button>
        <button
        onClick={()=>upComingFeatured()}
        disabled={shippingFee === null || shippingFee === 0 || loading}
         className={`w-full h-12 rounded-full font-semibold transition duration-300 ease-in-out 
          ${shippingFee === null || shippingFee === 0 || loading ? "bg-gray-100 border-blue-200 flex items-center justify-center text-gray-500 cursor-not-allowed" : "bg-[#FFF] border-blue-500 border rounded-full flex items-center justify-center text-white cursor-pointer"}`}
      >
        {loading ? "" : (
<img className="w-25 " src="https://payos.vn/wp-content/uploads/2025/06/Casso-payOSLogo-1.svg" alt="" />
         )}
        </button>
       </div>
      

      <div className="w-full">
      <div className="w-full py-1 flex flex-col lg:flex-row items-center gap-2">
       <button
          onClick={() => navigate("/product")}
          className="w-full h-12 rounded-full cursor-pointer font-semibold border border-[#FF6624] bg-white text-[#FF6624]"
        >
          Keep shopping
        </button>
       <button
          onClick={() => navigate("/cart")}
          className="w-full h-12 rounded-full cursor-pointer font-semibold border border-[#FF6624] bg-white text-[#FF6624]"
        >
          Back to Cart
        </button>
       </div>
              {/* <p className="text-sm text-red-600">*Online payment method is being tested in a sandbox environment, please do not use a real bank card*</p> */}

      </div>
      </div>

   

      {/* <NotiAlert
  open={open}
  handleVnpayPayment={handleVnpayPayment}
  handleCloseModal={() => setOpen(false)}
/> */}

      
  
    </div>
  );
};

export default PriceTable;
