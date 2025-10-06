import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../../api/orders";
import useToast from "../../../hook/useToast";
import OrderTable from "../../../components/admin/table/OrderTable";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Bạn chưa đăng nhập!");
        setLoading(false);
        return;
      }

      try {
        const res = await getAllOrders(token);
        setOrders(res.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh sách đơn hàng!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Danh sách đơn hàng
      </h2>
      <OrderTable orders={orders} loading={loading} />
    </div>
  );
};

export default OrderList;
