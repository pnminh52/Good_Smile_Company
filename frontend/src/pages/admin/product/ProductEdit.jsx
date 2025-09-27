import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../components/admin/product/Form";

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
    gift_items: [],
    sold:0,
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

    <Form
     form={form}
     setForm={setForm}
     handleSubmit={handleSubmit}
     handleAdditionImageChange={handleAdditionImageChange}
     removeAdditionImage={removeAdditionImage}
     addAdditionImage={addAdditionImage}   
     categories={categories}  
   />
    </div>
  );
}

export default ProductEdit;