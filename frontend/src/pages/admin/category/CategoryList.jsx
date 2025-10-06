import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../../api/categories";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Title from './../../../components/admin/Title';
import AdminLoader from "../../../components/AdminLoader";
import CategoryTable from "../../../components/admin/table/CategoryTable";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
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
    } catch {
      message.error("❌ Failed to delete category");
    }
  };
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Title />
        <Link to="/admin/categories/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Category
          </Button>
        </Link>
      </div>

      {loading ? (
        <AdminLoader />
      ) : (
        <CategoryTable
          categories={categories}
          loading={loading}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoryList;
