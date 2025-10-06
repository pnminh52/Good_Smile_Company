import React, { useEffect, useState, useMemo } from "react";
import { getCategories, deleteCategory } from "../../../api/categories";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Title from "./../../../components/admin/Title";
import AdminLoader from "../../../components/AdminLoader";
import CategoryTable from "../../../components/admin/table/CategoryTable";
import CategoryFilter from "../filter/CategoryFilter";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter & sort states
  const [alphabetSort, setAlphabetSort] = useState("");
  const [countSort, setCountSort] = useState("");
  const [dateSort, setDateSort] = useState("");
  const [searchText, setSearchText] = useState("");

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

  // Filter & sort categories
  const filteredCategories = useMemo(() => {
    let data = [...categories];

    // Search
    if (searchText) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Sort
    if (alphabetSort) {
      data.sort((a, b) =>
        alphabetSort === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (countSort) {
      data.sort((a, b) =>
        countSort === "asc"
          ? a.product_count - b.product_count
          : b.product_count - a.product_count
      );
    } else if (dateSort) {
      data.sort((a, b) => {
        const aTime = new Date(a.created_at).getTime();
        const bTime = new Date(b.created_at).getTime();
        return dateSort === "asc" ? aTime - bTime : bTime - aTime;
      });
    }

    return data;
  }, [categories, alphabetSort, countSort, dateSort, searchText]);

  return (
    <div>
      {loading ? (
        <AdminLoader />
      ) : (
        <div className="bg-white rounded-xl shadow p-4 min-h-auto space-y-4">
          <div className="flex justify-between items-center">
            <Title />
            <Link to="/admin/categories/add">
              <Button type="primary" icon={<PlusOutlined />}>
                Add Category
              </Button>
            </Link>
          </div>

          {/* Filter + Search */}
          <CategoryFilter
            alphabetSort={alphabetSort}
            setAlphabetSort={setAlphabetSort}
            countSort={countSort}
            setCountSort={setCountSort}
            dateSort={dateSort}
            setDateSort={setDateSort}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          <CategoryTable
            categories={filteredCategories}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryList;
