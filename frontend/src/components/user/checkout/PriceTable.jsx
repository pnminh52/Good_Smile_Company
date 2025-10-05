import React from "react";
import { useNavigate } from "react-router-dom";

const PriceTable = ({ total, shippingFee, handleCodPayment, handleVnpayPayment, loading }) => {
  const navigate = useNavigate();

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

      <div className="flex flex-col  lg:gap-4 gap-2 items-center">
       <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-4 items-center">
         <button
          onClick={handleCodPayment}
          disabled={shippingFee === null || shippingFee === 0 || loading}
          className={`w-full py-3 rounded-full font-semibold transition duration-300 ease-in-out 
            ${shippingFee === null || shippingFee === 0 || loading ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-[#FF6900] text-white cursor-pointer"}`}
        >
          {loading ? "Processing..." : "Cash Order (COD)"}
        </button>

        <button
          onClick={handleVnpayPayment}
          disabled={shippingFee === null || shippingFee === 0 || loading}
          className={`w-full py-3 rounded-full font-semibold transition duration-300 ease-in-out 
            ${shippingFee === null || shippingFee === 0 || loading ? "bg-gray-100 border-blue-200 flex items-center justify-center text-gray-500 cursor-not-allowed" : "bg-[#FFF] border-blue-500 border rounded-full flex items-center justify-center text-white cursor-pointer"}`}
        >
          {loading ? "" : (
          <img className="w-20" src="./vnpay.png" alt="" />

          )}
        </button>
       </div>

        <button
          onClick={() => navigate("/cart")}
          className="w-full py-3 rounded-full font-semibold border border-[#FF6624] bg-white text-[#FF6624]"
        >
          Back to Cart
        </button>
              <p className="text-sm text-red-600">*Online payment method is being tested in a sandbox environment, please do not use a real bank card*</p>

      </div>
    </div>
  );
};

export default PriceTable;
