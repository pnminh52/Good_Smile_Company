import React from "react";
import { Table, Button, Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductTable = ({ handleEdit,filteredProducts, setSelectedProduct, handleDelete }) => {
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Image",
      dataIndex: "base_image",
      key: "base_image",
      align: "center",
      render: (img, record) => (
        <Image
          src={img}
          alt={record.name}
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: 6 }}
        />
      ),
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Release",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date) =>
        new Intl.DateTimeFormat("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(date)),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      align: "center",
      render: (cat) => cat || "None",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => setSelectedProduct(record)}
          />
            <Link to={`/admin/products/edit/${record.id}`}>
            <Button
                          size="small"
                          style={{ backgroundColor: "#facc15", borderColor: "#facc15" }}
                          icon={<EditOutlined />}
                        
                        />
            </Link>
           <Popconfirm
                      title="Delete this product?"
                      onConfirm={() => handleDelete(record.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
         
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={filteredProducts}
      columns={columns}
      rowKey="id"
      pagination={{ }}
      bordered
    />
  );
};

export default ProductTable;
