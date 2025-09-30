import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Tooltip } from "antd";
import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import PopupDetails from "./PopupDetails";
import { getOrderDetail } from "../../../api/orders";
import Pagination from "../Pagination";

const OrderTable = ({ orders, token, reloadOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth <= 768 ? 5 : 10);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(window.innerWidth <= 768 ? 5 : 10);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id", align: "center" },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (total) => `${Number(total).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Items",
      key: "itemsCount",
      align: "center",
      render: (_, record) => record.items?.length || 0,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const color =
          status === "Pending"
            ? "orange"
            : status === "Processing"
            ? "blue"
            : status === "Completed"
            ? "green"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Address / District",
      key: "address",
      align: "center",
      render: (_, record) => {
        const fullAddress = [record.address, record.district].filter(Boolean).join(", ");
        const shortAddress = fullAddress.length > 20 ? fullAddress.slice(0, 20) + "..." : fullAddress;
        return <Tooltip title={fullAddress}>{shortAddress}</Tooltip>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          icon={loadingId === record.id ? <LoadingOutlined spin /> : <EyeOutlined />}
          onClick={() => handleViewDetails(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table dataSource={paginatedOrders} columns={columns} rowKey="id" pagination={false} />

      {orders.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(orders.length / pageSize)}
          onPageChange={setCurrentPage}
        />
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

export default OrderTable;
