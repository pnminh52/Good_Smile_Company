import { useEffect, useState } from "react";
import useShippingFee from "../../../hook/useShippingFee";
import { Link } from "react-router-dom";

const PriceInfo = ({ cartItems, handleCheckout, handleDeleteAll }) => {
  const { shippingFee } = useShippingFee();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const grandTotal = subtotal + (shippingFee ?? 0);

  return (
    <div>
      {/* Price summary */}
      <div className="space-y-2 pb-4">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p>
            {subtotal.toLocaleString("vi-VN", {
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
    : shippingFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
</p>

         
        </div>

        <div className="flex font-semibold items-center justify-between">
          <p>Total</p>
          <p>
            {shippingFee === null
              ? "..."
              : grandTotal.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-300" />

      {/* Actions */}
      <div className="pt-4 space-y-2">
        <button
          onClick={handleCheckout}
          disabled={shippingFee === null || shippingFee === 0}
          className={`w-full py-3 transition duration-300 ease-in-out  rounded-full
            ${
              shippingFee === null || shippingFee === 0
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-[#FF6900] text-white cursor-pointer"
            }`}
        >
          Proceed to Checkout
        </button>

        <Link to={"/product"} className="block w-full">
          <button className="bg-white border border-[#FF6900] text-[#FF6900] w-full py-3  rounded-full cursor-pointer">
            Keep Shopping
          </button>
        </Link>

        {/* <button
          onClick={handleClearCart}
          className="border text-red-600 border-red-600 w-full py-3 font-semibold rounded-full cursor-pointer"
        >
          Clear cart
        </button> */}
      </div>

     

    </div>
  );
};

export default PriceInfo;
