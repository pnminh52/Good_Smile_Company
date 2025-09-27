import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/products";
import { Link } from "react-router-dom";
import { Table, Button, Popconfirm, Image, Space, message } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PopupDetailTab from "../../../components/admin/product/PopupDetailTab";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      message.error("❌ Lỗi khi tải sản phẩm");
      console.error("❌ Error fetchProducts:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      message.success("🗑️ Xóa sản phẩm thành công");
      fetchProducts();
    } catch (err) {
      message.error("❌ Lỗi khi xóa sản phẩm");
      console.error("❌ Error deleteProduct:", err.message);
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
      dataIndex: "base_image",
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
      title: "Price",
      dataIndex: "price",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
      width: 150,
    },    
    {
      title: "Category",
      dataIndex: "category_name",
      render: (text) => text || "None",
      width: 150,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => setSelectedProduct(record)}
          >
            
          </Button>
          <Link to={`/admin/products/edit/${record.id}`}>
            <Button
              type="default"
              icon={<EditOutlined />}
              style={{ backgroundColor: "#fadb14", color: "#000" }}
            >
              
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/admin/products/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </Link>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      {/* Popup chi tiết */}
      {selectedProduct && (
        <PopupDetailTab
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductList;