import React, { useState } from "react";
import { Table, Button, Tag, Tooltip } from "antd";
import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import PopupDetails from "./PopupDetails";
import { getOrderDetail } from "../../../api/orders";

const OrderTable = ({ orders, token, reloadOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  console.log("One order record:", orders[0]);

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
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
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
        let color =
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
        return (
          <Tooltip title={fullAddress}>
            {shortAddress}
          </Tooltip>
        );
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
          icon={
            loadingId === record.id ? (
              <LoadingOutlined spin />
            ) : (
              <EyeOutlined />
            )
          }
          onClick={() => handleViewDetails(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        bordered
        pagination={false}
        scroll={{ x: 800 }} 
        className="min-w-[600px] sm:min-w-full"
      />

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
