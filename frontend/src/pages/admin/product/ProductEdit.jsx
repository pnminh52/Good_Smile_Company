import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    imagecopyright:"",
    name: "",
    title: "",
    series: "",
    release_date: "",
    decalProduction: "",
    specifications: "",
    sculptor: "",
    planningAndProduction: "",
    productionCooperation: "",
    paintwork: "",
    relatedInformation: "",
    manufacturer: "",
    distributedBy: "",
    price: "",
    stock: "",
    status: "available",
    base_image: "",
    additional_images: [""],
    category_id: "",
    description: "",
    copyrightSeries: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setForm({
          ...res.data,
          release_date: res.data.release_date
            ? new Date(res.data.release_date).toISOString().split("T")[0] // ép thành YYYY-MM-DD
            : "",
          additional_images: res.data.additional_images || [""],
        });
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      }
    };
    

    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateProduct(id, {
        ...form,
        price: form.price ? parseFloat(form.price) : 0,
        stock: form.stock ? parseInt(form.stock) : 0,
      });
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error updating product:", err);
      setError("Không thể cập nhật sản phẩm. Thử lại sau!");
    }
  };

  const handleAdditionImageChange = (i, value) => {
    const newImages = [...form.additional_images];
    newImages[i] = value;
    setForm({ ...form, additional_images: newImages });
  };

  const addAdditionImage = () =>
    setForm({ ...form, additional_images: [...form.additional_images, ""] });

  const removeAdditionImage = (i) =>
    setForm({
      ...form,
      additional_images: form.additional_images.filter(
        (_, index) => index !== i
      ),
    });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Product (Figure)</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 bg-white p-6 rounded-xl shadow"
      >
        {/* Basic Info */}
        <input
          className="border rounded p-2"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
                 <input
          className="border rounded p-2"
          placeholder="imagecopyright"
          value={form.imagecopyright}
          onChange={(e) =>
            setForm({ ...form, imagecopyright: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Series"
          value={form.series}
          onChange={(e) => setForm({ ...form, series: e.target.value })}
        />
        <input
          type="date"
          className="border rounded p-2"
          value={form.release_date}
          onChange={(e) =>
            setForm({ ...form, release_date: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Decal Production"
          value={form.decalProduction}
          onChange={(e) =>
            setForm({ ...form, decalProduction: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Specifications"
          value={form.specifications}
          onChange={(e) =>
            setForm({ ...form, specifications: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Sculptor"
          value={form.sculptor}
          onChange={(e) => setForm({ ...form, sculptor: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Planning and Production"
          value={form.planningAndProduction}
          onChange={(e) =>
            setForm({ ...form, planningAndProduction: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Production Cooperation"
          value={form.productionCooperation}
          onChange={(e) =>
            setForm({ ...form, productionCooperation: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Paintwork"
          value={form.paintwork}
          onChange={(e) => setForm({ ...form, paintwork: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Related Information"
          value={form.relatedInformation}
          onChange={(e) =>
            setForm({ ...form, relatedInformation: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Manufacturer"
          value={form.manufacturer}
          onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Distributed By"
          value={form.distributedBy}
          onChange={(e) =>
            setForm({ ...form, distributedBy: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Copyright / Series Owner"
          value={form.copyrightSeries}
          onChange={(e) =>
            setForm({ ...form, copyrightSeries: e.target.value })
          }
        />
        <input
          type="number"
          step="0.01"
          className="border rounded p-2"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="number"
          className="border rounded p-2"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border rounded p-2"
        >
          <option value="available">Available</option>
          <option value="preorder">Pre-Order</option>
          <option value="soldout">Sold Out</option>
        </select>
        <input
          className="border rounded p-2"
          placeholder="Base Image URL"
          value={form.base_image}
          onChange={(e) =>
            setForm({ ...form, base_image: e.target.value })
          }
        />

        {/* Category */}
        <select
          value={form.category_id || ""}
          onChange={(e) =>
            setForm({
              ...form,
              category_id:
                e.target.value === "" ? null : Number(e.target.value),
            })
          }
          className="border rounded p-2"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Additional Images */}
        <div>
          <h3 className="font-semibold mb-2">📷 Additional Images</h3>
          {form.additional_images.map((img, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="border rounded p-2 flex-1"
                placeholder="Image URL"
                value={img}
                onChange={(e) =>
                  handleAdditionImageChange(i, e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeAdditionImage(i)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAdditionImage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            ➕ Add Image
          </button>
        </div>

        {/* Description */}
        <textarea
          className="border rounded p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
        >
          ✅ Update Product
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
