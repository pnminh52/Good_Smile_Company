import { Table, Space, Button, Popconfirm, Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const CategoryTable = ({ categories, loading, onDelete }) => {
  const columns = [
    { title: "#", render: (_, __, index) => index + 1, align: "center" },
    {
      title: "Image",
      dataIndex: "image",
      render: (img, record) => (
        <Image src={img} alt={record.name} width={50} height={50} className="object-cover rounded" />
      ),
      align: "center",
    },
    { title: "Name", dataIndex: "name", render: text => <strong>{text}</strong>, align: "center" },
    { title: "Description", dataIndex: "description", align: "center" },
    { title: "Products", dataIndex: "product_count", align: "center" },
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
                   /></Link>
          <Popconfirm
            title="Delete this category?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={categories}
      loading={loading}
      pagination={false}
      bordered
    />
  );
};

export default CategoryTable;
