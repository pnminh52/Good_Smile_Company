import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { changePassword } from "../../../api/auth";
import useToast from "../../../hook/useToast";

const Security = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
      const token = localStorage.getItem("token"); // hoặc lấy từ context/store
      const res = await changePassword(
        { oldPassword, newPassword },
        token
      );
  
      toast.success(res.data?.message || "Password changed successfully");
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.error || "Change password failed");
    }
  };
  

  return (
    <div className="space-y-2 ">
      <p className="text-md">Password</p>
      <div className="flex items-center gap-2 w-full">
        <Input.Password
          value="********"
          disabled
          className="border rounded-lg w-full  border-gray-100"
        />
        <button
          onClick={handleOpenModal}
          className=" cursor-pointer rounded-full transition duration-300 ease-in-out border-[#F06E00] text-white bg-[#F06E00] px-4 py-1  "
        >
          Change
        </button>
      </div>

      <Modal
  title="Change Password"
  open={isModalVisible}
  onCancel={handleCloseModal}
  style={{maxWidth:"80%"}}
  footer={null} // ẩn footer mặc định
>
  <div className="flex flex-col gap-3">
    <Input.Password
      placeholder="Old password"
      value={oldPassword}
      onChange={(e) => setOldPassword(e.target.value)}
    />
    <Input.Password
      placeholder="New password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <Input.Password
      placeholder="Confirm new password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />

    {/* Nút Confirm full width */}
    <button
      onClick={handleChangePassword}
      className="mt-0 w-full rounded-full bg-[#F06E00] text-white font-semibold py-2  hover:bg-[#d95f00] transition"
    >
      Confirm
    </button>
  </div>
</Modal>

    </div>
  );
};

export default Security;
