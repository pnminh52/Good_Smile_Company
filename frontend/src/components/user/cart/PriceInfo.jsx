import { useEffect, useState } from "react";
import useShippingFee from "../../../hook/useShippingFee";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";

const PriceInfo = ({ cartItems, handleCheckout, handleDeleteAll }) => {
  const { shippingFee } = useShippingFee();
  const [open, setOpen] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const grandTotal = subtotal + (shippingFee ?? 0);


  const handleOk = () => {
    handleDeleteAll();
    setOpen(false);
  };
  // useEffect(()=>{
  //   console.log(address);
    
  // },[address])
  

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
          <p>
  {shippingFee === null
    ? "..."
    : shippingFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
</p>

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
      <div className="pt-4 space-y-3">
        <button
          onClick={handleCheckout}
          disabled={shippingFee === null || shippingFee === 0}
          className={`w-full py-3 transition duration-300 ease-in-out font-semibold rounded-full
            ${
              shippingFee === null || shippingFee === 0
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-[#FF6900] text-white cursor-pointer"
            }`}
        >
          Proceed to Checkout
        </button>

        <Link to={"/product"} className="block w-full">
          <button className="bg-white border border-[#FF6900] text-[#FF6900] w-full py-3 font-semibold rounded-full cursor-pointer">
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

      {/* Antd Confirm Modal */}
      <Modal
      width={400}
  title="Clear Cart"
  open={open}
  footer={null} // bỏ footer mặc định
  onCancel={() => setOpen(false)}
  centered
>
  <p>Are you sure you want to clear the cart?</p>
  <p className="text-red-600">
     There are few left in stock,
     this action will permanently removed all items in your cart and can't be undone!  
  </p>

  <div className="flex gap-2 pt-4">
    <button
      onClick={() => setOpen(false)}
      className="w-full cursor-pointer py-2 rounded-md border border-gray-300 text-gray-700"
    >
      Cancel
    </button>
    <button
      onClick={handleOk}
      className="w-full cursor-pointer py-2 rounded-md bg-red-600 text-white font-semibold"
    >
      Clear
    </button>
  </div>
</Modal>

    </div>
  );
};

export default PriceInfo;
