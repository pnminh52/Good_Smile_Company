import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../../api/categories";

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu category theo id
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategoryById(id);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetchCategory:", err.message);
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Xử lý cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(id, form);
      navigate("/admin/categories");
    } catch (err) {
      console.error("❌ Error updateCategory:", err.message);
    }
  };

  if (loading) return <p className="text-center">⏳ Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Category</h1>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input
          className="border rounded p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          className="border rounded p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          💾 Update Category
        </button>
      </form>
    </div>
  );
}

export default CategoryEdit;
