import { Form, Input, Button } from "antd";

const AddPopup = ({ onSubmit, loading, initialValues = {} }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image URL"
        rules={[{ required: true, message: "Image URL is required" }]}
      >
        <Input placeholder="https://example.com/image.jpg" />
      </Form.Item>

      <div className="flex justify-end gap-2">
        <Button htmlType="reset">Reset</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default AddPopup;
