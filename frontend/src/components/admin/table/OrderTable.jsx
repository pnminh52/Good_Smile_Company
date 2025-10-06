import React, { useState } from "react";
import { Table, Tag, Space, Modal } from "antd";
import OrderDetails from "../../../pages/admin/order/OrderDetails";

const OrderTable = ({ orders, loading }) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenDetailTab = (record) => {
    setSelectedOrder(record);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      render: (id) => <span className="font-semibold">#{id}</span>,
    },
    {
      title: "Khách hàng",
      dataIndex: "user_name",
      key: "user_name",
      render: (name) => name || "Người dùng ẩn danh",
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "total",
      render: (total) =>
        total ? Number(total).toLocaleString("vi-VN") + " ₫" : "—",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        switch (status?.toLowerCase()) {
          case "pending":
            color = "orange";
            break;
          case "processing":
            color = "blue";
            break;
          case "completed":
            color = "green";
            break;
          case "cancelled":
          case "canceled":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status || "Unknown"}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) =>
        date ? new Date(date).toLocaleString("vi-VN") : "—",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <p
            onClick={() => handleOpenDetailTab(record)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Xem chi tiết
          </p>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?.id}`}
        open={open}
        onCancel={handleClose}
        footer={null}
        centered
        destroyOnHidden
        
      >
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>
    </div>
  );
};

export default OrderTable;
