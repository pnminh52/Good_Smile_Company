import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Space,
  message,
  DatePicker,
} from "antd";
import moment from "moment";

function ProductAdd({ open, onClose }) {
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

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        release_date: values.release_date ? values.release_date.format("YYYY-MM-DD") : "",
        price: values.price ? parseFloat(values.price) : 0,
        stock: values.stock ? parseInt(values.stock) : 0,
        sold: values.sold ? parseInt(values.sold) : 0,
      };
      await createProduct(payload);
      message.success("Thêm sản phẩm thành công!");
      form.resetFields();
      onClose();
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Error creating product:", err);
      message.error("Không thể thêm sản phẩm. Thử lại sau!");
    }
  };

  return (
    <Modal
      title="➕ Add New Product (Figure)"
      open={open}
      onCancel={onClose}
      footer={null}
      width={ 700  }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: "available", additional_images: [""], gift_items: [] }}
      >
        <div className="flex items-center gap-2 py-1">
   <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
         <Form.Item label="Series" name="series">
                  <Input />
                </Form.Item>
        
                <Form.Item label="Release Date" name="release_date">
                  <DatePicker className="w-full" />
                </Form.Item>
        </div>
        {/* Basic Info */}
     

        {/* Brand */}
        <Form.Item label="Brand" name="imagecopyright">
  <Space wrap>
    {brands.map((b, idx) => (
      <div
        key={idx}
        onClick={() => {
          form.setFieldsValue({ imagecopyright: b.url });
          setSelectedBrand(b.url); // cập nhật state để re-render ngay
        }}
        style={{
          border: selectedBrand === b.url ? "2px solid #1890ff" : "1px solid #ccc",
          padding: 4,
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        <img src={b.url} alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
      </div>
    ))}
  </Space>
</Form.Item>

       

        <Form.Item label="Decal Production" name="decalProduction">
          <Input />
        </Form.Item>

        <Form.Item label="Specifications" name="specifications">
          <Input />
        </Form.Item>

        <Form.Item label="Sculptor" name="sculptor">
          <Input />
        </Form.Item>

        <Form.Item label="Planning and Production" name="planningAndProduction">
          <Input />
        </Form.Item>

        <Form.Item label="Sold" name="sold">
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <Form.List name="gift_items">
          {(fields, { add, remove }) => (
            <div>
              <label className="font-semibold">🎁 Gift Items</label>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} direction="vertical" style={{ marginBottom: 8 }}>
                  <Form.Item {...restField} name={[name, "title"]} label="Gift Title">
                    <Input />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "description"]} label="Gift Description">
                    <Input />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "image"]} label="Gift Image URL">
                    <Input />
                  </Form.Item>
                  <Button type="dashed" danger onClick={() => remove(name)}>
                    ❌ Remove Gift
                  </Button>
                </Space>
              ))}
              <Button type="dashed" onClick={() => add({ title: "", description: "", image: "" })} block>
                ➕ Add Gift
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item label="Production Cooperation" name="productionCooperation">
          <Input />
        </Form.Item>

        <Form.Item label="Paintwork" name="paintwork">
          <Input />
        </Form.Item>

        <Form.Item label="Related Information" name="relatedInformation">
          <Input />
        </Form.Item>

        <Form.Item label="Manufacturer" name="manufacturer">
          <Input />
        </Form.Item>

        <Form.Item label="Distributed By" name="distributedBy">
          <Input />
        </Form.Item>

        <Form.Item label="Copyright / Series Owner" name="copyrightSeries">
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber className="w-full" min={0} step={0.01} />
        </Form.Item>

        <Form.Item label="Stock" name="stock">
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="preorder">Pre-Order</Select.Option>
            <Select.Option value="soldout">Sold Out</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Base Image URL" name="base_image">
          <Input />
        </Form.Item>

        <Form.List name="additional_images">
          {(fields, { add, remove }) => (
            <div>
              <label className="font-semibold">📷 Additional Images</label>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={name} rules={[{ required: true, message: "Nhập URL" }]}>
                    <Input placeholder="Image URL" />
                  </Form.Item>
                  <Button type="dashed" danger onClick={() => remove(name)}>
                    ❌
                  </Button>
                </Space>
              ))}
              <Button type="dashed" onClick={() => add("")} block>
                ➕ Add Image
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Category" name="category_id" rules={[{ required: true, message: "Chọn category!" }]}>
  <Select placeholder="-- Select Category --">
    {categories.map((cat) => (
      <Select.Option key={cat.id} value={cat.id}>
        {cat.name}
      </Select.Option>
    ))}
  </Select>
</Form.Item>


        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              ✅ Create Product
            </Button>
            <Button onClick={onClose}>❌ Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ProductAdd;
