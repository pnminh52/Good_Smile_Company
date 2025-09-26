import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import {
  Form,
  message,
} from "antd";
import FormAddAndEdit from './../../../components/admin/product/FormAddAndEdit';

function ProductAdd({ open, onClose }) {
  const [urls, setUrls] = useState([]);
  const handleChange = (value, index) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands] = useState([
    { url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/1/logo_gsc.png" },
    { url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/112/57_Sorarain.png" },
    { url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/18/86_Phat.png" },
    { url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/48/08_アニプレックス.png" },
    { url: "https://www.goodsmile.com//gsc-webrevo-sdk-storage-prd/maker/info/2728/original/small-logo-57c579d7080e38374ef559cea6f51ac7.jpg" },
    { url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/145/41_claynel.png" },
    { url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/2/logo_mxf.png" },
    { url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/105/120_Miyuki.png" },
    { url: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/maker/3/32439f517150696bff39a2540aa44a63.png" },
  ]);

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
  useEffect(() => {
    form.resetFields();
    setUrls([""]); // reset khi mở form mới
  }, [open]);
  
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        release_date: values.release_date ? values.release_date.format("YYYY-MM-DD") : null,
        price: values.price ? parseFloat(values.price) : 0,
        stock: values.stock ? parseInt(values.stock) : 0,
        sold: values.sold ? parseInt(values.sold) : 0,
        additional_images: urls.filter(url => url), // chỉ gửi URL không rỗng
        gift_items: values.gift_items?.filter(g => g.title) || [],
      };
      
      await createProduct(payload);
      message.success("Thêm sản phẩm thành công!");
      form.resetFields();
      setUrls([]); // reset ảnh phụ
      onClose();
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error creating product:", err.response?.data || err);
      message.error("Không thể thêm sản phẩm. Thử lại sau!");
    }
  };
  

  return (
   <div>
     <FormAddAndEdit
    form={form}
    open={open}
    onClose={onClose}
    urls={urls}
    setUrls={setUrls}
    categories={categories}
    selectedBrand={selectedBrand}
    setSelectedBrand={setSelectedBrand}
    brands={brands}
    handleSubmit={handleSubmit}
    handleChange={handleChange}
    
  />
   </div>
  );
}

export default ProductAdd;
