import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Card, message } from "antd";
import { getNewsById, updateNews } from "../../../api/new";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const NewUpdate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await getNewsById(id);
        form.setFieldsValue({ ...data, content: undefined }); // title & type
        setContent(data.content || ""); // content riêng cho Quill
      } catch (err) {
        console.error("❌ Lỗi load news:", err);
        message.error("Load news failed!");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id, form]);

  const handleFinish = async (values) => {
    try {
      await updateNews(id, { ...values, content });
      message.success("News updated successfully!");
      navigate("/admin/news");
    } catch (err) {
      console.error("❌ Lỗi cập nhật news:", err);
      message.error("Update news failed!");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card title="Edit News">
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
            <Option value="announcement">Announcement</Option>
            <Option value="event">Event</Option>
            <Option value="promotion">Promotion</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update News
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

export default NewUpdate;
