// pages/user/Order.jsx
import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../api/orders";
import Loader from "../../components/Loader";
import OrderTable from "../../components/user/order/OrderTable";
import NotFound from './NotFound';
import NoResult from "../../components/user/NoResult";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await getUserOrders(token);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (loading) return <Loader />;
  if (!orders.length) return <><NoResult /></>;

  return (
    <div className="max-w-screen-xl w-full mx-auto  px-0">
      <h1 className="sm:text-2xl text-xl sm:px-0 px-4 font-semibold sm:py-6 py-4"> Orders</h1>
      <OrderTable orders={orders} token={token} reloadOrders={fetchOrders} />
    </div>
  );
};

export default Order;
