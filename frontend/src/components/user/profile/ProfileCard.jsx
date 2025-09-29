import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getProfile, updateProfile } from "../../../api/auth";
import { uploadImage } from "../../../api/upload";
import useToast from "../../../hook/useToast";
import Loader from "../../Loader";
import useAuth from "../../../hook/useAuth";

const { Option } = Select;

const provinces = [
  "Hà Nội","Hồ Chí Minh","Đà Nẵng","Hải Phòng","Cần Thơ",
  "An Giang","Bà Rịa - Vũng Tàu","Bạc Liêu","Bắc Giang","Bắc Kạn",
  "Bắc Ninh","Bến Tre","Bình Dương","Bình Định","Bình Phước","Bình Thuận",
  "Cà Mau","Cao Bằng","Đắk Lắk","Đắk Nông","Điện Biên","Đồng Nai",
  "Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Tĩnh","Hải Dương",
  "Hậu Giang","Hòa Bình","Hưng Yên","Khánh Hòa","Kiên Giang","Kon Tum",
  "Lai Châu","Lâm Đồng","Lạng Sơn","Lào Cai","Long An","Nam Định",
  "Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Phú Yên","Quảng Bình",
  "Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La",
  "Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên Huế",
  "Tiền Giang","Trà Vinh","Tuyên Quang","Vĩnh Long","Vĩnh Phúc","Yên Bái"
];

const ProfileCard = ({handdleLogOut}) => {
  const { login: contextLogin } = useAuth();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await getProfile(token);
        const profile = res.data.user || res.data;
        setUser(profile);
        form.setFieldsValue(profile);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, [form]);

  const handleUploadAvatar = async ({ file }) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const data = await uploadImage(formData);
      const avatarUrl = data.url;

      const token = localStorage.getItem("token");
      const res = await updateProfile({ avatar: avatarUrl }, token);

      setUser((prev) => ({ ...prev, ...res.data.user, avatar: avatarUrl }));
      form.setFieldsValue({ avatar: avatarUrl });
      toast.success("Update avatar successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update avatar!");
    } finally {
      setUploading(false);
    }
  };


  const handleSave = async (values) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const payload = {
        ...values,
        district: Array.isArray(values.district) ? values.district : [],
      };
      const res = await updateProfile(payload, token);
  
      const updatedUser = res.data.user || res.data;
      setUser(updatedUser);
  
      // đồng bộ với context + localStorage
      contextLogin(updatedUser, token);
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      toast.success("Update info successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update info!");
    } finally {
      setSaving(false);
    }
  };
  
  

  if (!user) return <Loader />;

  return (
    <Card
     
       className=" mx-auto px-4 justify-center [&_.ant-card-cover]:flex [&_.ant-card-cover]:justify-center [&_.ant-card-cover]:items-center"
      
    
      
      
      
    >
   <Form.Item style={{padding:"0px"}}   layout="vertical" label="Avatar" name="avatar">
  <Upload
    customRequest={handleUploadAvatar}
    listType="picture-card"
    showUploadList={false} 
    accept="image/*"
  >
    {user.avatar ? (
      <img
        src={user.avatar}
        alt="avatar"
        style={{ width: "100%" }}
      />
    ) : (
      <div>
        <UploadOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )}
  </Upload>
</Form.Item>


      <Form
        form={form}
        layout="vertical"
        initialValues={user}
        onFinish={handleSave}
      >


        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
       

        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="Address (Province/City)" name="address">
          <Select placeholder="Chọn tỉnh/thành phố">
            {provinces.map((p) => (
              <Option key={p} value={p}>
                {p}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Districts" name="district">
  <Select
    mode="tags"
    placeholder="Nhập hoặc chọn quận/huyện"
  >
    {Array.isArray(user.district) &&
      user.district.map((d) => (
        <Option key={d} value={d}>
          {d}
        </Option>
      ))}
  </Select>
</Form.Item>



<Form.Item>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px", // khoảng cách giữa 2 nút
      width: "100%",
    }}
  >
    <Button
      type="primary"
      htmlType="submit"
      loading={saving}
      style={{
        backgroundColor: "#FF6624",
        color: "white",
        fontWeight: 600,
        borderRadius: "9999px",
        border: "none",
        width: "100%",
        height: "45px",
      }}
    >
      Save
    </Button>
    <Button
      type="primary"
      htmlType="button"
      onClick={handdleLogOut}
      loading={saving}
      style={{
        backgroundColor: "#FFF",
        color: "#FF6624",
        fontWeight: 600,
        borderRadius: "9999px",
        border: "1px solid #FF6624",
        width: "100%",
        height: "45px",
      }}
    >
      Logout
    </Button>
  </div>
</Form.Item>


      </Form>
    </Card>
  );
};

export default ProfileCard;
