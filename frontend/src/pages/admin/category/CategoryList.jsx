import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../../api/categories";
import { Link } from "react-router-dom";
import { Table, Button, Popconfirm, Image, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      message.error("❌ Lỗi khi tải danh mục");
      console.error("❌ Error fetchCategories:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success("🗑️ Xóa danh mục thành công");
      fetchCategories();
    } catch (err) {
      message.error("❌ Lỗi khi xóa danh mục");
      console.error("❌ Error deleteCategory:", err.message);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      width: 60,
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img, record) => (
        <Image
          src={img}
          alt={record.name}
          width={50}
          height={50}
          className="object-cover rounded"
        />
      ),
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <span style={{ color: "#555" }}>{text}</span>,
    },
    {
      title: "Products",
      dataIndex: "product_count",
      align: "center",
      width: 120,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Link to={`/admin/categories/edit/${record.id}`}>
            <Button
              type="default"
              icon={<EditOutlined />}
              style={{ backgroundColor: "#fadb14", color: "#000" }}
            >
              
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc muốn xóa danh mục này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link to="/admin/categories/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Category
          </Button>
        </Link>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={categories}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
}

export default CategoryList;
