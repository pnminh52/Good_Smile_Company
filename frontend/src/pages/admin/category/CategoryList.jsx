import { useEffect, useState } from "react";
import { getCategories, deleteCategory, createCategory, getCategoryById, updateCategory } from "../../../api/categories";
import { Table, Button, Popconfirm, Image, Space, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Title from './../../../components/admin/Title';
import AddPopup from "../../../components/admin/category/AddPopup";
import AdminLoader from "../../../components/AdminLoader";
function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // popup Add
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // popup Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      message.error("❌ Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success("🗑️ Category deleted successfully");
      fetchCategories();
    } catch (err) {
      message.error("❌ Failed to delete category");
    }
  };

  const handleAdd = async (values) => {
    try {
      setSaving(true);
      await createCategory(values);
      message.success("✅ Category created successfully");
      fetchCategories();
      setIsAddOpen(false);
    } catch (err) {
      message.error("❌ Failed to add category");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = async (id) => {
    setEditLoading(true);
    try {
      const res = await getCategoryById(id);
      setCurrentCategory(res.data);
      setIsEditOpen(true);
    } catch (err) {
      message.error("❌ Failed to load category");
    } finally {
      setEditLoading(false);
    }
  };

  const handleEdit = async (values) => {
    try {
      await updateCategory(currentCategory.id, values);
      message.success("✏️ Category updated successfully");
      fetchCategories();
      setIsEditOpen(false);
    } catch (err) {
      message.error("❌ Failed to update category");
    }
  };

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
    { title: "Name", dataIndex: "name", render: (text) => <strong>{text}</strong>, align: "center" },
    { title: "Description", dataIndex: "description", align: "center" },
    { title: "Products", dataIndex: "product_count", align: "center" },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
           onClick={() => openEdit(record.id)} 
                       size="small"
                       style={{ backgroundColor: "#facc15", borderColor: "#facc15" }}
                       icon={<EditOutlined />}
                     />
          <Popconfirm
            title="Delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Title />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddOpen(true)}
        >
          Add Category
        </Button>
      </div>
 {loading ? (
        < ><AdminLoader /></>
      ) : (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={categories}
        loading={loading}
        pagination={false}
        bordered
      />
      )}

      {/* ✅ Modal Add */}
      <Modal
        title="Add Category"
        open={isAddOpen}
        onCancel={() => setIsAddOpen(false)}
        footer={null}
      >
        <AddPopup onSubmit={handleAdd} loading={saving} />
      </Modal>

      {/* ✅ Modal Edit */}
      <Modal
        title="Edit Category"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        footer={null}
      >
        {editLoading ? (
          <p className="text-center">⏳ Loading...</p>
        ) : (
          <AddPopup
            onSubmit={handleEdit}
            loading={false}
            initialValues={currentCategory || {}}
          />
        )}
      </Modal>
    </div>
  );
}

export default CategoryList;
