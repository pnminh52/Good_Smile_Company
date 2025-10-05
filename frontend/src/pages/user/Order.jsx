import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../api/orders";
import Loader from "../../components/Loader";
import OrderTable from "../../components/user/order/OrderTable";
import NoResult from "../../components/user/NoResult";
import OrderFilterBar from "../../components/user/order/OrderFilterBar";
import MobileOrder from './../../components/user/order/MobileOrder';
import MobileFilter from "../../components/user/order/MobileFilter";
const Order = () => {
  const [filter, setFilter] = useState({
    status: "",
    sortOrder: "",
    keyword: "",
    paymentMethod:""
  });
  const [orders, setOrders] = useState([]);
  const [sortQuantity, setSortQuantity] = useState(""); 
  const [priceRange, setPriceRange] = useState([2000000, 100000000]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [sortTotal, setSortTotal] = useState(""); 
  const [pageKey, setPageKey] = useState(0);
  // const handleFilterChange = (changed) => {
  //   if ("priceRange" in changed) setPriceRange(changed.priceRange);
  //   if ("sortQuantity" in changed) setSortQuantity(changed.sortQuantity ?? undefined);
  //   if ("sortTotal" in changed) setSortTotal(changed.sortTotal ?? undefined);
  //   if ("paymentMethod" in changed) setFilter(prev => ({ ...prev, paymentMethod: changed.paymentMethod }));
    
  //   setFilter(prev => ({ ...prev, ...changed }));
  //   setPageKey(prev => prev + 1);
  // };
  

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

  const filteredOrders = orders
  .filter(order => {
    const matchStatus = filter.status
      ? order.status.toLowerCase() === filter.status.toLowerCase()
      : true;

    const matchKeyword = filter.keyword
      ? order.id.toString().includes(filter.keyword) ||
        order.items?.some(p => p.name.toLowerCase().includes(filter.keyword.toLowerCase())) ||
        [order.address, order.district].some(f => f?.toLowerCase().includes(filter.keyword.toLowerCase()))
      : true;

    const matchPrice = priceRange &&
      order.total >= priceRange[0] &&
      order.total <= priceRange[1];

    const matchPayment = filter.paymentMethod
      ? order.payment_method === filter.paymentMethod
      : true;

    // existing date filter
    const createdDate = new Date(order.created_at);
    let matchDate = true;
    const now = new Date();
    if (filter.sortOrder === "this_year") {
      matchDate = createdDate.getFullYear() === now.getFullYear();
    } else if (filter.sortOrder === "this_month") {
      matchDate = createdDate.getFullYear() === now.getFullYear() && createdDate.getMonth() === now.getMonth();
    } else if (filter.sortOrder === "this_week") {
      const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      matchDate = createdDate >= firstDayOfWeek && createdDate <= lastDayOfWeek;
    }

    return matchStatus && matchKeyword && matchPrice && matchPayment && matchDate;
  })
  .sort((a, b) => {
    if (sortTotal) return sortTotal === "asc" ? a.total - b.total : b.total - a.total;
    if (sortQuantity) return sortQuantity === "asc" ? (a.items?.length||0) - (b.items?.length||0) : (b.items?.length||0) - (a.items?.length||0);

    if (filter.sortOrder === "newest") return new Date(b.created_at) - new Date(a.created_at);
    if (filter.sortOrder === "oldest") return new Date(a.created_at) - new Date(b.created_at);

    return 0;
  });




  return (
    <div className="max-w-screen-xl w-full mx-auto px-4 lg:px-0">
      <h1 className="     text-xl font-semibold sm:py-6 py-4">Orders ({filteredOrders.length})</h1>
  <div className="  block lg:hidden pb-2">
  <MobileFilter
  key={pageKey}
  status={filter.status}
  sortOrder={filter.sortOrder}
  keyword={filter.keyword}
  priceRange={priceRange}
  sortQuantity={sortQuantity}
  sortTotal={sortTotal}
  paymentMethod={filter.paymentMethod} // thêm prop này
  onChange={(changed) => {
    if ("priceRange" in changed) setPriceRange(changed.priceRange);
    if ("sortQuantity" in changed) setSortQuantity(changed.sortQuantity ?? undefined); 
    if ("sortTotal" in changed) setSortTotal(changed.sortTotal ?? undefined); 

    setFilter(prev => ({
      ...prev,
      ...changed,
    }));
    setPageKey(prev => prev + 1);
  }}
/>

        </div>
      <div className="flex flex-col sm:flex-row sm:gap-4 gap-2">
        <div className="lg:w-[80%] w-full hidden sm:block">
          <OrderTable
            orders={filteredOrders}
            token={token}
            reloadOrders={fetchOrders}
          />
        
        </div>
     
      
        <div className=" w-[20%] hidden lg:block">
          <OrderFilterBar
            status={filter.status}
            sortOrder={filter.sortOrder}
            keyword={filter.keyword}
            priceRange={priceRange}
            sortQuantity={sortQuantity}
            sortTotal={sortTotal}
            onChange={(changed) => {
              if ("priceRange" in changed) setPriceRange(changed.priceRange);
              if ("sortQuantity" in changed) setSortQuantity(changed.sortQuantity ?? undefined); 
              if ("sortTotal" in changed) setSortTotal(changed.sortTotal ?? undefined); 
              setFilter((prev) => ({ ...prev, ...changed }));
            }}
            
            
          />
        </div>
        
           <div className="block sm:hidden">
                    <MobileOrder  orders={filteredOrders}
                               key={pageKey} 

                              token={token}
                              reloadOrders={fetchOrders}/>
                </div>
      </div>
    </div>
  );
};

export default Order;
