import React, { useState } from "react";
import { Form, Input, Select, Button, Card, message, Image } from "antd";
import { createBanner } from "../../../api/banner";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const BannerAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [mobilePreview, setMobilePreview] = useState("");
  const [desktopPreview, setDesktopPreview] = useState("");

  const handleFinish = async (values) => {
    try {
      await createBanner(values);
      message.success("Banner added successfully!");
      navigate("/admin/banners");
    } catch (err) {
      console.error("❌ Lỗi thêm banner:", err);
      message.error("Add banner failed!");
    }
  };

  return (
    <Card title="Add New Banner">
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
          <Input
            placeholder="Mobile image URL"
            onChange={(e) => setMobilePreview(e.target.value)}
          />
        </Form.Item>
        {mobilePreview && <Image src={mobilePreview} width={200} style={{ marginBottom: 16 }} />}

        <Form.Item
          label="Image Desktop URL"
          name="image_desktop"
          rules={[{ required: true, message: "Please input desktop image URL!" }]}
        >
          <Input
            placeholder="Desktop image URL"
            onChange={(e) => setDesktopPreview(e.target.value)}
          />
        </Form.Item>
        {desktopPreview && <Image src={desktopPreview} width={400} style={{ marginBottom: 16 }} />}

        <Form.Item label="Link" name="link">
          <Input placeholder="Link (optional)" />
        </Form.Item>

        <Form.Item label="Status" name="status" initialValue="active">
          <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Banner
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate("/admin/banners")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BannerAdd;
