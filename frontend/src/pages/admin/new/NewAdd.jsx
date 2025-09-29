import React, { useState } from "react";
import { Form, Input, Select, Button, Card, message } from "antd";
import { createNews } from "../../../api/new";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const NewAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [content, setContent] = useState(""); // <-- state cho ReactQuill

  const handleFinish = async (values) => {
    try {
      await createNews({ ...values, content }); // gộp content vào form values
      message.success("News added successfully!");
      navigate("/admin/news");
    } catch (err) {
      console.error("❌ Lỗi thêm news:", err);
      message.error("Add news failed!");
    }
  };

  return (
    <Card title="Add New News">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input news title!" }]}
        >
          <Input placeholder="News title" />
        </Form.Item>

        <Form.Item
          label="Content"
          rules={[{ required: true, message: "Please input news content!" }]}
        >
          <ReactQuill value={content} onChange={setContent} />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select news type!" }]}
        >
          <Select placeholder="Select type">
            <Option value="Shipping info">Shipping info</Option>
            <Option value="Notice">Notice</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add News
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => navigate("/admin/news")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewAdd;
