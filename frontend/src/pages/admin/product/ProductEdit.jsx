import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import { Form, message } from "antd";
import FormAddAndEdit from './../../../components/admin/product/FormAddAndEdit';
import moment from "moment";

function ProductEdit({ open, onClose, productId }) {
  const [urls, setUrls] = useState([]);
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
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  // Lấy danh sách category
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

  // Lấy dữ liệu sản phẩm khi mở modal hoặc productId thay đổi
  useEffect(() => {
    if (open && productId) {
      const fetchProduct = async () => {
        try {
          const res = await getProductById(productId);
          const product = res.data;
          form.setFieldsValue({
            ...product,
            release_date: product.release_date ? moment(product.release_date) : null,
          });
          setUrls(product.additional_images || [""]);
          setSelectedBrand(product.imagecopyright || "");
        } catch (err) {
          console.error(err);
          message.error("Không thể tải sản phẩm!");
        }
      };
      fetchProduct();
    }
  }, [open, productId, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        release_date: values.release_date ? values.release_date.format("YYYY-MM-DD") : null,
        price: values.price ? parseFloat(values.price) : 0,
        stock: values.stock ? parseInt(values.stock) : 0,
        sold: values.sold ? parseInt(values.sold) : 0,
        additional_images: urls.filter(url => url),
        gift_items: values.gift_items?.filter(g => g.title) || [],
      };
      await updateProduct(productId, payload);
      message.success("Cập nhật sản phẩm thành công!");
      onClose();
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error updating product:", err.response?.data || err);
      message.error("Không thể cập nhật sản phẩm. Thử lại sau!");
    }
  };

  return (
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
      initialValues={form.getFieldsValue()} // hiển thị dữ liệu ban đầu
    />
  );
}

export default ProductEdit;
