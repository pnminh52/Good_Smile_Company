import React, { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword } from "../../../api/auth";
import useToast from "../../../hook/useToast";
import Loader from "../../Loader";
import useAuth from "../../../hook/useAuth";
import { CloseOutlined, PlusOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin, Modal, Input } from "antd";


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

const ProfileCard = ({ handdleLogOut }) => {
  const { login: contextLogin } = useAuth();
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const [isChanged, setIsChanged]=useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await getProfile(token);
        const profile = res.data.user || res.data;
        setUser(profile);
        setFormData(profile);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user profile!");
      }
    };
    fetchProfile();
  }, []);
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDistrictChange = (index, value) => {
    const updated = [...(formData.district || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, district: updated }));
  };

  const addDistrict = () => {
    if ((formData.district?.length || 0) >= 3) {
      toast.error("You can only add up to 3 districts!");
      return;
    }
    const updated = [...(formData.district || []), ""];
    setFormData((prev) => ({ ...prev, district: updated }));
  };

  const removeDistrict = (index) => {
    const updated = [...(formData.district || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, district: updated }));
  };

  useEffect(() => {
    if (!user) return;
    const hasChanged =
      JSON.stringify({
        ...formData,
        district: (formData.district || []).filter((d) => d.trim()),
      }) !==
      JSON.stringify({
        ...user,
        district: (user.district || []).filter((d) => d.trim()),
      });
    setIsChanged(hasChanged);
  }, [formData, user]);
  
  const handleSave = async (e) => {
    e.preventDefault();
  
    // Kiểm tra district trống
    if ((formData.district || []).some((d) => !d.trim())) {
      toast.error("Please fill in all district fields before saving!");
      return;
    }
  
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        district: formData.district?.filter((d) => d.trim()) || [],
      };
      const res = await updateProfile(payload, token);
      const updatedUser = res.data.user || res.data;
      setUser(updatedUser);
      contextLogin(updatedUser, token);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      setIsChanged(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile!");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await changePassword({ oldPassword, newPassword }, token);
      toast.success(res.data?.message || "Password changed successfully!");
      setIsModalVisible(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Change password failed");
    }
  };

  if (!user) return <Loader />;

  return (
   <div>
     <p className=" text-xl  font-semibold py-4">  Information</p>

<div className="w-full mx-auto bg-white p-4 border rounded-lg lg:rounded-sm border-gray-200 ">


  <form onSubmit={handleSave} className="space-y-5">
   
    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        value={formData.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        value={formData.email || ""}
        disabled
        className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Phone</label>
      <input
        type="text"
        value={formData.phone || ""}
        disabled
        onChange={(e) => handleChange("phone", e.target.value)}
        className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
      />
    </div>

    {/* Address */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Address (Province/City)</label>
      <select
        value={formData.address || ""}
        onChange={(e) => handleChange("address", e.target.value)}
        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
      >
        <option value="">-- Select Province/City --</option>
        {provinces.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>

    {/* Districts */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Districts (Limit 3 per account)
      </label>
      <div className="space-y-2">
        {(formData.district || []).map((district, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={district}
              onChange={(e) => handleDistrictChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeDistrict(index)}
              className="text-red-500 cursor-pointer  "
            >
              <CloseOutlined />
            </button>
          </div>
        ))}
      </div>
      {(!formData.district || formData.district.length < 3) && (
        <button
          type="button"
          onClick={addDistrict}
          className="mt-2 text-sm text-[#FF6900] border p-2 rounded-lg cursor-pointer font-semibold "
        >
          <PlusOutlined /> Add District
        </button>
      )}
    </div>

    {/* Password Section */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
      <div className="flex items-center gap-2">
        <input
          type="password"
          value="********"
          disabled
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
       <button
  type="button"
  onClick={() => setIsModalVisible(true)}
  className="rounded-lg cursor-pointer bg-white text-[#FF6900] border font-semibold 
             w-10 h-10 p-2 lg:w-auto lg:h-auto lg:px-4 lg:py-2"
>
  <EditOutlined /> <span className="hidden lg:inline">Change</span>
</button>

      </div>
    </div>

    <div className="flex flex-col gap-3 mt-6">
  {/* Nút Save */}
  <Button
    type="primary"
    htmlType="submit"
    loading={saving}
    size="large"
    shape="round"
    style={{ background: "#FF6900", borderColor: "#FF6900", height: "48px", padding: "0 24px", border:"1px solid #FF6900" }}

  >
    Save
  </Button>

  {/* Nút Logout */}
  <Button
    type="default"
    onClick={handdleLogOut}
    loading={saving}
     size="large"
    shape="round"

    style={{ background: "#FFF", color:"#FF6900", borderColor: "#FF6900", height: "48px", padding: "0 24px", border:"1px solid #FF6900" }}
  >
    Logout
  </Button>
</div>
  </form>

  {/* Modal Change Password */}
  {isModalVisible && (
   <Modal
   title="Change Password"
  open={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={null}
  centered 
  styles={{ padding: 0 }}
  style={{ maxWidth: "95%" }}
 >
   <div className="flex flex-col gap-3">
     <Input.Password
       placeholder="Old password"
       value={oldPassword}
       size="large"
       onChange={(e) => setOldPassword(e.target.value)}
       className="w-full"
     />
     <Input.Password
       placeholder="New password"
       value={newPassword}
       onChange={(e) => setNewPassword(e.target.value)}
       className="w-full"
        size="large"
     />
     <Input.Password
       placeholder="Confirm new password"
       value={confirmPassword}
       onChange={(e) => setConfirmPassword(e.target.value)}
       className="w-full"
        size="large"
     />
 
     <div className="flex gap-3 mt-2">
       <Button
         type="primary"
         size="large"
         shape="round"
     className="w-full"
     style={{ background: "#FF6900", borderColor: "#FF6900", border:"1px solid #FF6900" }}
         onClick={handleChangePassword}
         loading={saving} // nếu muốn hiện spinner khi đang lưu
       >
         Confirm
       </Button>
     
     </div>
   </div>
 </Modal>
  )}
</div>
   </div>
  );
};

export default ProfileCard;
