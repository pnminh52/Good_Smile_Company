import { useState, useEffect } from "react";
import { createProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import { useNavigate } from "react-router-dom";
import BrandSelect from './../../../components/admin/product/BrandSelect';
import Form from './../../../components/admin/product/Form';

function ProductAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    imagecopyright:"",
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
    sold:0,
    status: "available",
    base_image: "https://www.goodsmile.com",
    additional_images: [""],
    gift_items: [],
    category_id: "",
    description: "",
    copyrightSeries: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createProduct({
        ...form,
        price: form.price ? parseFloat(form.price) : 0,
        stock: form.stock ? parseInt(form.stock) : 0,
        release_date: form.release_date || new Date().toISOString().split("T")[0],
      });
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error creating product:", err);
      setError("Không thể thêm sản phẩm. Thử lại sau!");
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
    <div className="">
      <h1 className="text-xl font-semibold py-4">Add New Product</h1>
      {error && <p className="text-red-500 ">{error}</p>}

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

export default ProductAdd;