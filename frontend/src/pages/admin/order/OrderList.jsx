import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { getAllOrders } from "../../../api/orders";
import useToast from "../../../hook/useToast";

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
            console.log(res.data);

      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh sách đơn hàng!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      render: (id) => <span className="font-semibold">#{id}</span>,
    },
    {
        title: "Khách hàng",
        dataIndex: "user_id",
        key: "user_id",
        render: (user) => user?.name || "Người dùng ẩn danh",
      },
      
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "total",
      render: (total) =>
        total ? total.toLocaleString("vi-VN") + " ₫" : "—",
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
          case "completed":
            color = "green";
            break;
          case "cancelled":
          case "canceled":
            color = "red";
            break;
          default:
            color = "blue";
        }
        return <Tag color={color}>{status || "Unknown"}</Tag>;
      },
    },
    {
        title: "Ngày tạo",
        dataIndex: "created_at",
        key: "created_at",
        render: (date) => date ? new Date(date).toLocaleString("vi-VN") : "—",
      },
      
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            href={`/admin/orders/${record.id}`}
            className="text-blue-600 hover:underline"
          >
            Xem chi tiết
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Danh sách đơn hàng
      </h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderList;
