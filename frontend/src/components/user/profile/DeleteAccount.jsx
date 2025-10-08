import React, { useState } from "react";
import { Modal, Input, Radio, Button, message as antdMessage, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { requestDeleteAccount } from "../../../api/account";

const DeleteAccount = () => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const token = localStorage.getItem("token");

  const predefinedReasons = [
    "I’m concerned about my privacy.",
    "I receive too many emails or notifications.",
    "I no longer use this service.",
    "I have another account.",
    "Other",
  ];

  const requiredPhrase = "I understand and still want to delete my account";

  const handleOpenConfirm = () => {
    if (!reason.trim()) {
      antdMessage.warning("Please select a reason first.");
      return;
    }
    setConfirmVisible(true);
  };

  const handleCopyPhrase = async () => {
    try {
      await navigator.clipboard.writeText(requiredPhrase);
      antdMessage.success("Copied to clipboard!");
    } catch {
      antdMessage.error("Failed to copy text.");
    }
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const res = await requestDeleteAccount(token, reason);
      antdMessage.success(
        res.message || "Your delete request has been sent successfully!"
      );

      // clear
      setReason("");
      localStorage.removeItem("token"); // logout user
      setTimeout(() => {
        window.location.href = "/login"; // redirect after logout
      }, 1000);
    } catch (err) {
      console.error(err);
      antdMessage.error(
        err.response?.data?.error || "Failed to send delete request."
      );
    } finally {
      setLoading(false);
      setConfirmVisible(false);
      setConfirmText("");
    }
  };

  return (
    <div className="w-full mx-auto bg-white">
      <h2 className="text-2xl font-semibold text-red-600 py-4">
        Delete Account
      </h2>
      <p className="text-gray-600 mb-3">
        If you really want to delete your account, please select your reason below.
        The administrator will review and confirm before your account is permanently deleted.
      </p>

      <Radio.Group
        onChange={(e) => setReason(e.target.value)}
        value={reason}
        className="flex flex-col gap-2 mb-4"
      >
        {predefinedReasons.map((r, i) => (
          <Radio key={i} value={r}>
            {r}
          </Radio>
        ))}
      </Radio.Group>

      <Button
        type="primary"
        danger
        block
        onClick={handleOpenConfirm}
        disabled={loading}
      >
        Send Delete Request
      </Button>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Account Deletion"
        open={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        footer={false}
        centered
      >
        <p className="mb-3">
          This action <strong>cannot be undone</strong>. Please type the
          following sentence to confirm:
        </p>
        <div className="bg-gray-100 p-2 rounded text-sm font-mono mb-3 flex items-center justify-between">
          <span>{requiredPhrase}</span>
          <Tooltip title="Copy phrase">
            <Button
              icon={<CopyOutlined />}
              type="text"
              onClick={handleCopyPhrase}
            />
          </Tooltip>
        </div>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type the confirmation phrase exactly..."
        />

        <Button
          type="primary"
          danger
          block
          className="mt-4"
          disabled={confirmText !== requiredPhrase}
          loading={loading}
          onClick={handleConfirmDelete}
        >
          Confirm Delete
        </Button>
      </Modal>
    </div>
  );
};

export default DeleteAccount;
