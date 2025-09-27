import React, { useEffect } from "react";
import { Form, Input, Select, Button, Card, message } from "antd";
import { updateBanner, getBannerById } from "../../../api/banner";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const BannerEdit = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ route

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await getBannerById(id);
        form.setFieldsValue(data);
      } catch (err) {
        console.error("❌ Lỗi load banner:", err);
        message.error("Load banner failed!");
      }
    };
    fetchBanner();
  }, [id, form]);

  const handleFinish = async (values) => {
    try {
      await updateBanner(id, values);
      message.success("Banner updated successfully!");
      navigate("/admin/banners"); // quay lại list
    } catch (err) {
      console.error("❌ Lỗi update banner:", err);
      message.error("Update banner failed!");
    }
  };

  return (
    <Card title="Edit Banner">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input banner title!" }]}
        >
          <Input placeholder="Banner title" />
        </Form.Item>

        <Form.Item
          label="Image Mobile URL"
          name="image_mobile"
          rules={[{ required: true, message: "Please input mobile image URL!" }]}
        >
          <Input placeholder="Mobile image URL" />
        </Form.Item>

        <Form.Item
          label="Image Desktop URL"
          name="image_desktop"
          rules={[{ required: true, message: "Please input desktop image URL!" }]}
        >
          <Input placeholder="Desktop image URL" />
        </Form.Item>

        <Form.Item label="Link" name="link">
          <Input placeholder="Link (optional)" />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Banner
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate("/admin/banners")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BannerEdit;
