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
  Image,
  Space,
  message,
  DatePicker,
} from "antd";
import moment from "moment";

import { PlusOutlined, DeleteOutlined, FileImageOutlined } from "@ant-design/icons";

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
      title="Add New Product"
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
       <div className="flex gap-2 py-0">
  <Form.Item label="Product Name" name="name" className="flex-1" rules={[{ required: true }]}>
    <Input />
  </Form.Item>

  <Form.Item label="Title" name="title" className="flex-1">
    <Input />
  </Form.Item>

  <Form.Item label="Series" name="series" className="flex-1">
    <Input />
  </Form.Item>
</div>
<div className="flex gap-2 py-0">
  <Form.Item label="Release Date" name="release_date" className="flex-1">
    <DatePicker className="w-full" />
  </Form.Item>

  <Form.Item label="Price" name="price" className="flex-1">
    <InputNumber min={0} step={0.01} style={{width:"100%"}} />
  </Form.Item>

  <Form.Item label="Stock" name="stock" className="flex-1">
    <InputNumber min={0}  style={{width:"100%"}} />
  </Form.Item>
</div>


        {/* Basic Info */}
     
      
        {/* Brand */}
        <Form.Item label="Brand" name="imagecopyright">
  <div className="grid grid-cols-4 gap-3">
    {brands.map((b, idx) => (
      <div
        key={idx}
        onClick={() => {
          form.setFieldsValue({ imagecopyright: b.url });
          setSelectedBrand(b.url);
        }}
        className={`cursor-pointer p-2 border rounded-lg flex items-center justify-center transition-all 
          ${selectedBrand === b.url ? "border-blue-500 shadow-lg" : "border-gray-300 hover:border-blue-400"} 
          hover:scale-105`}
      >
        <img
          src={b.url}
          alt=""
          className="w-16 h-16 object-contain"
        />
      </div>
    ))}
  </div>
</Form.Item>


       

<div className="flex gap-2 py-1">
  <Form.Item label="Decal Production" name="decalProduction" className="flex-1">
    <Input />
  </Form.Item>

  <Form.Item label="Specifications" name="specifications" className="flex-1">
    <Input />
  </Form.Item>

  <Form.Item label="Sculptor" name="sculptor" className="flex-1">
    <Input />
  </Form.Item>
</div>


      {/* Hàng 1 */}
<div className="flex gap-2 py-1">
  <Form.Item label="Planning and Production" name="planningAndProduction" className="flex-1">
    <Input />
  </Form.Item>
  <Form.Item label="Sold" name="sold" className="flex-1">
    <InputNumber style={{width:"100%"}} min={0} />
  </Form.Item>
  <Form.Item label="Production Cooperation" name="productionCooperation" className="flex-1">
    <Input />
  </Form.Item>
</div>

{/* Hàng 2 */}
<div className="flex gap-2 py-1">
  <Form.Item label="Paintwork" name="paintwork" className="flex-1">
    <Input />
  </Form.Item>
  <Form.Item label="Related Information" name="relatedInformation" className="flex-1">
    <Input />
  </Form.Item>
  <Form.Item label="Manufacturer" name="manufacturer" className="flex-1">
    <Input />
  </Form.Item>
</div>

{/* Hàng 3 */}
<div className="flex gap-2 py-1">
  <Form.Item label="Distributed By" name="distributedBy" className="flex-1">
    <Input />
  </Form.Item>
  <Form.Item label="Copyright / Series Owner" name="copyrightSeries" className="flex-1">
    <Input />
  </Form.Item>
  <Form.Item label="Status" name="status" className="flex-1">
    <Select>
      <Select.Option value="available">Available</Select.Option>
      <Select.Option value="preorder">Pre-Order</Select.Option>
      <Select.Option value="soldout">Sold Out</Select.Option>
    </Select>
  </Form.Item>
</div>


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

       

     

      

        <Form.Item label="Base Image URL" name="base_image">
          <Input />
        </Form.Item>

        <Form.List name="additional_images">
      {(fields, { add, remove }) => (
        <div>
        
          {urls.length > 0 && (
                      <div className=" mt-2 mb-2 flex gap-2 overflow-x-auto ">
                        <Image.PreviewGroup>
                          {urls.map((url, index) => url && (
                            <Image key={index} src={url} width={80} height={80} style={{ objectFit: "contain", borderRadius: 4, border:"1px solid #F3F4F6", background:"#F3F4F6" }} />
                          ))}
                        </Image.PreviewGroup>
                      </div>
                    )}

          {urls.map((url, index) => (
  <div key={index} className="flex items-center gap-2 mb-3">
    {/* Input URL */}
    <input
      type="text"
      placeholder="Image URL"
      value={url}
      onChange={(e) => handleChange(e.target.value, index)}
      className="flex-1 h-10 border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* Nút xóa */}
    <button
      type="button"
      className="text-red-600 border border-red-600 px-3 rounded flex items-center justify-center h-10 hover:bg-red-50"
      onClick={() => {
        setUrls(urls.filter((_, i) => i !== index));
      }}
    >
      <DeleteOutlined />
    </button>
  </div>
))}

{/* Nút thêm ảnh */}
<button
  type="button"
  className="w-full flex items-center justify-center gap-2 py-2 mt-2 border border-dashed border-gray-400 rounded hover:bg-gray-100 text-gray-700"
  onClick={() => setUrls([...urls, ""])}
>
  <PlusOutlined /> Add Image
</button>


        

          
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
