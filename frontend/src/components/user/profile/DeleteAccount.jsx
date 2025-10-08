import React, { useState } from "react";
import { Modal, Input, Radio, Button, message as antdMessage } from "antd";
import { requestDeleteAccount } from "../../../api/account";

const DeleteAccount = () => {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
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
    const finalReason =
      reason === "Other" ? customReason.trim() : reason.trim();

    if (!finalReason) {
      antdMessage.warning("Please select or enter a reason first.");
      return;
    }

    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    const finalReason =
      reason === "Other" ? customReason.trim() : reason.trim();

    setLoading(true);
    try {
      const res = await requestDeleteAccount(token, finalReason);
      antdMessage.success(
        res.message || "Your delete request has been sent successfully!"
      );
      setReason("");
      setCustomReason("");
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Delete Account
      </h2>
      <p className="text-gray-600 mb-3">
        If you really want to delete your account, please select or enter your
        reason below. The administrator will review and confirm before your
        account is permanently deleted.
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

      {reason === "Other" && (
        <Input.TextArea
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          placeholder="Enter your custom reason..."
          rows={4}
          className="mb-3"
        />
      )}

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
        footer={[
          <Button key="cancel" onClick={() => setConfirmVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            danger
            disabled={confirmText !== requiredPhrase}
            loading={loading}
            onClick={handleConfirmDelete}
          >
            Confirm Delete
          </Button>,
        ]}
      >
        <p className="mb-3">
          This action <strong>cannot be undone</strong>. Please type the
          following sentence to confirm:
        </p>
        <p className="bg-gray-100 p-2 rounded text-sm font-mono mb-3">
          {requiredPhrase}
        </p>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type the confirmation phrase exactly..."
        />
      </Modal>
    </div>
  );
};

export default DeleteAccount;
