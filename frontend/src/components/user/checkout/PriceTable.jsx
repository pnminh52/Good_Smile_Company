import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVnpayPayment } from "../../../api/payment";

const PriceTable = ({ total, shippingFee, handleCodPayment, orderId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleVnpayPayment = async () => {
    if (!shippingFee) return;
    

    try {
      setLoading(true);
      const orderInfo = "Payment for order " + orderId;
      const amount = total + shippingFee;

      const response = await createVnpayPayment({
        amount,
        orderId,
        orderInfo,
      });

      if (response.data.paymentUrl) {
        // Redirect sang VNPay
        window.location.href = response.data.paymentUrl;
      } else {
        alert("Cannot create VNPay payment link.");
      }
    } catch (error) {
      console.error("VNPay Payment Error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-4 space-y-4">
        <div className="border-t space-y-2 py-2 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <p>
              {total.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Shipping</p>
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
            <p>Grand Total</p>
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

        <div className="flex flex-col lg:flex-row lg:gap-4 gap-2 items-center">
          <button
            onClick={handleCodPayment}
            disabled={shippingFee === null || shippingFee === 0}
            className={`w-full py-3 transition duration-300 ease-in-out rounded-full font-semibold 
              ${
                shippingFee === null || shippingFee === 0
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-[#FF6900] text-white cursor-pointer"
              }
            `}
          >
            Pay with COD
          </button>

          <button
            onClick={handleVnpayPayment}
            disabled={shippingFee === null || shippingFee === 0 || loading}
            className={`w-full py-3 transition duration-300 ease-in-out rounded-full font-semibold 
              ${
                shippingFee === null || shippingFee === 0
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-[#00AAFF] text-white cursor-pointer"
              }
            `}
          >
            {loading ? "Processing..." : "Pay Online (VNPay)"}
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-[#FFF] text-[#FF6624] w-full py-3 rounded-full cursor-pointer border border-[#FF6624] font-semibold"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceTable;
