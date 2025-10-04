import React, { useState } from "react";
import { Tag, Button, Collapse, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import PopupDetails from "./PopupDetails";
import { getOrderDetail } from "../../../api/orders";
import Pagination from "../Pagination";
import NoResult from "../NoResult";

const MobileOrder = ({ orders, token, reloadOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewDetails = async (id) => {
    try {
      setLoadingId(id);
      const res = await getOrderDetail(id, token);
      setSelectedOrder(res.data);
    } catch (err) {
      console.error("Failed to load order detail", err);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusTag = (status) => {
    let color =
      status === "Pending"
        ? "orange"
        : status === "Processing"
        ? "blue"
        : status === "Completed"
        ? "green"
        : "red";
    return <Tag color={color}>{status}</Tag>;
  };

  const getPaymentTag =(method)=>{
    let color = method === "Online Banking" ? "blue":"green"
    return <Tag color={color}>{method}</Tag>
  }

  if (orders.length === 0) return <NoResult />;

  return (
    <div className="sm:hidden block">
      <Collapse
        accordion
        items={paginatedOrders.map((order) => ({
          key: order.id,
          label: (
            <div className="flex flex-col">
              <span className="font-semibold">Order #{order.id}</span>
              <span className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>
          ),
          children: (
            <div className="space-y-2">
              <p>
                <span className="font-medium">Total</span>{" "}
                {Number(order.total).toLocaleString("vi-VN")}đ
              </p>
              <p>
                <span className="font-medium">Items in order</span> {order.items?.length || 0}
              </p>
              <p>
                <span className="font-medium">Order status</span> {getStatusTag(order.status)}
              </p>
                <p>
                <span className="font-medium">Payment method using</span> {getPaymentTag(order.payment_method)}
              </p>
              <p>
                <span className="font-medium">User address/district at </span>{" "}
                {[order.address, order.district].filter(Boolean).join(", ")}
              </p>

              <Button
                type="primary"
                icon={loadingId === order.id ? <Spin size="small" /> : <EyeOutlined />}
                onClick={() => handleViewDetails(order.id)}
                style={{
                  backgroundColor: "#FFF7E6",
                  borderColor: "#EA9108",
                  color: "#EA9108",
                }}
              >
                View Details
              </Button>
            </div>
          ),
        }))}
      />

      {/* Pagination chỉ hiện khi tổng orders > pageSize */}
      {orders.length > pageSize && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(orders.length / pageSize)}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {selectedOrder && (
        <PopupDetails
          order={selectedOrder}
          token={token}
          onClose={() => setSelectedOrder(null)}
          onUpdated={reloadOrders}
        />
      )}
    </div>
  );
};

export default MobileOrder;
