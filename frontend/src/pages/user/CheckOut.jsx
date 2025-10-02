import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orders";
import { clearCart } from "../../api/cart";
import UserInfoCard from './../../components/user/checkout/UserInfoCard';
import useToast from "../../hook/useToast";
import useShippingFee from "../../hook/useShippingFee";
import CheckOutItem from './../../components/user/checkout/CheckOutItem';
import PriceTable from "../../components/user/checkout/PriceTable";
import NotFound from './NotFound';
import { useState, useEffect } from "react";
import Loader from './../../components/Loader';


const Checkout = () => {
  const toast = useToast();
  const location = useLocation();
  const orderId = `ORDER${Date.now()}`; 
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const { address, shippingFee } = useShippingFee();
  const [userInfo, setUserInfo] = useState({ selectedDistrict: "", district: [] });
  const [loading, setLoading] = useState(false); 

 useEffect(() => {
    if (address) setUserInfo(prev => ({ ...prev, selectedDistrict: address }));
  }, [address]);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleCodPayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login before ordering!");
      return;
    }

    setLoading(true); // bật loader
    setTimeout(async () => {
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        address: userInfo.address,
        selectedDistrict: userInfo.selectedDistrict,
        shippingFee
      };

      try {
        await createOrder(orderData, token);
        await clearCart(token);
        toast.success("Order placed successfully!");
        navigate("/order");
      } catch (err) {
        console.error("COD error:", err.response?.data || err.message);
        toast.error("Order failed");
      } finally {
        setLoading(false); // tắt loader
      }
    }, 1000); // delay 1 giây
  };

  if (cartItems.length === 0) return <><NotFound /></>;
  if (loading) {
    return <Loader />;
  }
   return (
    <div className="max-w-screen-lg w-full mx-auto lg:px-30 px-4 ">
      <h1 className="   text-xl font-semibold sm:py-6 py-4">Checkout</h1>
      <div className="flex flex-col">
        <CheckOutItem cartItems={cartItems} />

        <UserInfoCard onChange={setUserInfo} />

        <PriceTable
          total={total}
          shippingFee={shippingFee}
          handleCodPayment={handleCodPayment}
          loading={loading}   // truyền xuống PriceTable
           orderId={orderId} 
        />
      </div>

     
    </div>
  );
};

export default Checkout;
