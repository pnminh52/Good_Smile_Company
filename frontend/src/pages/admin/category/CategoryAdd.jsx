import { useState } from "react";
import { createCategory } from "../../../api/categories";
import { useNavigate } from "react-router-dom";
import Title from "./../../../components/admin/Title";
import useToast from './../../../hook/useToast';

function CategoryAdd() {
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.image.trim()) {
      toast.error("Image URL is required");
      return;
    }

    try {
      setLoading(true);

      await createCategory(form);

      toast.success("Category created successfully!");

      // reset form
      setForm({ name: "", description: "", image: "" });

      // quay về danh sách
      navigate("/admin/categories");
    } catch (err) {
      // console.error("❌ Error createCategory:", err.message);
      toast.error("Failed to add category. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Title />
      </div>

    <div className="w-full flex justify-center items-center">
    <form className="grid gap-4 max-w-screen-2xl" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Name *</label>
          <input
            className="border rounded-lg p-2 w-full"
            placeholder="Enter category name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="border rounded-lg p-2 w-full"
            placeholder="Enter category description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL *</label>
          <input
            className="border rounded-lg p-2 w-full"
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white font-semibold rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "⏳ Saving..." : "✅ Save Category"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default CategoryAdd;
