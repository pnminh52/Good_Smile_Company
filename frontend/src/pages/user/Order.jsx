// pages/user/Order.jsx
import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../api/orders";
import Loader from "../../components/Loader";
import OrderTable from "../../components/user/order/OrderTable";
import NoResult from "../../components/user/NoResult";
import OrderFilterBar from './../../components/user/order/OrderFilterBar';

const Order = () => {
  const [filter, setFilter] = useState({ status: "", startDate: null, endDate: null, keyword: "" });
  const [orders, setOrders] = useState([]);
  const [sortQuantity, setSortQuantity] = useState(""); 
  const [priceRange, setPriceRange] = useState([5000000, 100000000]);
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
  if (!orders.length) return <NoResult />;

  const filteredOrders = orders.filter((order) => {
    const matchStatus = filter.status
      ? order.status.toLowerCase() === filter.status.toLowerCase()
      : true;
  
    const matchKeyword = filter.keyword
      ? order.id.toString().includes(filter.keyword) ||
        order.products.some((p) =>
          p.name.toLowerCase().includes(filter.keyword.toLowerCase())
        )
      : true;
  
    const matchPrice =
      priceRange &&
      order.total >= priceRange[0] &&
      order.total <= priceRange[1];
  
    return matchStatus && matchKeyword && matchPrice;
  });
  
  // sort theo created_at
  if (filter.sortOrder === "newest") {
    filteredOrders.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (filter.sortOrder === "oldest") {
    filteredOrders.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }
  
// sort theo số lượng sản phẩm
if (sortQuantity === "asc") {
  filteredOrders.sort((a, b) => 
    (a.order.products?.length || 0) - (b.products?.length || 0)
  );
} else if (sortQuantity === "desc") {
  filteredOrders.sort((a, b) => 
    (b.products?.length || 0) - (a.products?.length || 0)
  );
}

  
  
  // sort theo created_at
  if (filter.sortOrder === "newest") {
    filteredOrders.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (filter.sortOrder === "oldest") {
    filteredOrders.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }
  


  return (
    <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-0">
      <h1 className="sm:text-2xl text-xl font-semibold sm:py-6 py-4">Orders</h1>

      {/* Layout: table 80% - filter 20% */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className=" w-[80%]">
          <OrderTable orders={filteredOrders} token={token} reloadOrders={fetchOrders} />
        </div>
        <div className="w-[20%]">
        <OrderFilterBar
  status={filter.status}
  sortOrder={filter.sortOrder}
  keyword={filter.keyword}
  priceRange={priceRange}
  sortQuantity={sortQuantity}
  onChange={(changed) => {
    if (changed.priceRange) setPriceRange(changed.priceRange);
    if (changed.sortQuantity) setSortQuantity(changed.sortQuantity);
    setFilter((prev) => ({ ...prev, ...changed }));
  }}
/>

        </div>
      </div>
    </div>
  );
};

export default Order;
