import React, { useState, useEffect } from "react";
import { Modal, Input, Radio, Button, message as antdMessage, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { requestDeleteAccount, cancelDeleteAccount } from "../../../api/account";
import { getProfile } from "../../../api/auth";

const DeleteAccount = () => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [hasRequested, setHasRequested] = useState(false);

  const token = localStorage.getItem("token");
  const requiredPhrase = "I understand and still want to delete my account";

  const predefinedReasons = [
    "I’m concerned about my privacy.",
    "I receive too many emails or notifications.",
    "I no longer use this service.",
    "I have another account.",
    "Other",
  ];

  // Redirect nếu không có token
  if (!token) {
    window.location.href = "/login";
    return null;
  }

  // Lấy profile user xem đã gửi request chưa
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(token);
        setHasRequested(profile.is_delete_requested || false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

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
      await requestDeleteAccount(reason);
      antdMessage.success("Your delete request has been sent!");
      setHasRequested(true);
      // ✅ Giữ token, không logout
    } catch (err) {
      console.error(err);
      antdMessage.error(err.response?.data?.error || "Failed to send delete request.");
    } finally {
      setLoading(false);
      setConfirmVisible(false);
      setConfirmText("");
    }
  };

  const handleUndoRequest = async () => {
    setLoading(true);
    try {
      await cancelDeleteAccount();
      antdMessage.success("Your delete request has been canceled.");
      setHasRequested(false);
    } catch (err) {
      console.error(err);
      antdMessage.error(err.response?.data?.error || "Failed to cancel delete request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Delete Account</h2>
      <p className="text-gray-600 mb-3">
        {hasRequested
          ? "You have already sent a delete request. You can undo it below."
          : "Select your reason to delete your account. Admin will review and confirm before permanent deletion."}
      </p>

      {!hasRequested && (
        <>
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

          <Modal
            title="Confirm Account Deletion"
            open={confirmVisible}
            onCancel={() => setConfirmVisible(false)}
            footer={null}
            centered
          >
            <p className="mb-3">
              This action <strong>cannot be undone</strong>. Type the phrase below to confirm:
            </p>
            <div className="bg-gray-100 p-2 rounded text-sm font-mono mb-3 flex items-center justify-between">
              <span>{requiredPhrase}</span>
              <Tooltip title="Copy phrase">
                <Button icon={<CopyOutlined />} type="text" onClick={handleCopyPhrase} />
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
        </>
      )}

      {hasRequested && (
        <Button type="default" block onClick={handleUndoRequest} loading={loading}>
          Undo Delete Request
        </Button>
      )}
    </div>
  );
};

export default DeleteAccount;
