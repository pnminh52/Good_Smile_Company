import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orders";
import { clearCart } from "../../api/cart";
import UserInfoCard from './../../components/user/checkout/UserInfoCard';
import CheckOutItem from './../../components/user/checkout/CheckOutItem';
import PriceTable from "../../components/user/checkout/PriceTable";
import NotFound from './NotFound';
import Loader from './../../components/Loader';
import useToast from "../../hook/useToast";
import useShippingFee from "../../hook/useShippingFee";
import { createVnpayPayment } from './../../api/payment';

const Checkout = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const { address, shippingFee } = useShippingFee();
  const [userInfo, setUserInfo] = useState({ selectedDistrict: "", district: [], address: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) setUserInfo(prev => ({ ...prev, selectedDistrict: address, address }));
  }, [address]);

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  // COD payment
  const handleCodPayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login before ordering!");
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({ product_id: item.product_id, quantity: item.quantity })),
        address: userInfo.address,
        selectedDistrict: userInfo.selectedDistrict,
        shippingFee
      };
      await createOrder(orderData, token);
      await clearCart(token);
      toast.success("Order placed successfully!");
      navigate("/order");
    } catch (err) {
      console.error("COD error:", err.response?.data || err.message);
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // VNPay payment
  const handleVnpayPayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login!");
    setLoading(true);

    try {
      // 1️⃣ Tạo order trước
      const orderData = {
        items: cartItems.map(item => ({ product_id: item.product_id, quantity: item.quantity, price: item.price })),
        address: userInfo.address,
        selectedDistrict: userInfo.selectedDistrict,
        shippingFee,
      };

      const createdOrder = await createOrder(orderData, token);
      const orderId = createdOrder.data.orderId; // ✅ lấy orderId trả về từ server
console.log(orderId);

    // 2️⃣ Gọi API FE VNPay
const { data } = await createVnpayPayment({
  orderId, // orderId từ backend
  amount: Math.floor(total + shippingFee) // tổng tiền + phí ship
});

// ✅ Chuyển sang VNPay
if (data.paymentUrl) {
  window.location.href = data.paymentUrl; // redirect sang VNPay
}

    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) return <NotFound />;
  if (loading) return <Loader />;

  return (
    <div className="max-w-screen-lg w-full mx-auto lg:px-30 px-4">
      <h1 className="text-xl font-semibold sm:py-6 py-4">Checkout</h1>
      <div className="flex flex-col">
        <CheckOutItem cartItems={cartItems} />
        <UserInfoCard onChange={setUserInfo} />
        <PriceTable
          total={total}
          shippingFee={shippingFee}
          handleCodPayment={handleCodPayment}
          handleVnpayPayment={handleVnpayPayment}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Checkout;
