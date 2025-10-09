import React, { useState, useEffect } from "react";
import { Modal, Input, Radio, Button, message as antdMessage, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { requestDeleteAccount, cancelDeleteAccount } from "../../../api/account";
import { getProfile } from "../../../api/auth";
import useToast from "../../../hook/useToast";

const DeleteAccount = () => {
    const toast=useToast()
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


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const profile = await getProfile(token);
        setHasRequested(profile.is_delete_requested || false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);
  

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
      toast.success("Your delete request has been canceled.");
      setHasRequested(false);
    } catch (err) {
      console.error(err);
      antdMessage.error(err.response?.data?.error || "Failed to cancel delete request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <h2 className="text-xl font-semibold py-4 text-red-600">Delete Account</h2>
  
      <div className="w-full border rounded-lg gap-2 flex flex-col sm:flex-row items-center justify-between  bg-white p-4 border-gray-200">
        {/* Text */}
        <div className="w-full sm:w-2/3 text-left">
        <p className="text-black text-sm">
  {hasRequested
    ? "You have already sent a delete request for your account. If you change your mind, you can undo this request below before the account is permanently deleted."
    : "Select your reason for deleting your account. Once you send the delete request, the admin will review it and confirm before your account is permanently removed. Please make sure to choose the reason that best describes why you want to leave."}
</p>

        </div>
  
        {/* Button */}
        <div className="w-full lg:w-1/3 flex justify-center">
          {hasRequested ? (
            <Button
              type="primary"
              size="large"
              shape="round"
              className="w-full"
              style={{ border: "1px solid #FB2C36", background: "#FFF", color: "#FB2C36" }}
              onClick={handleUndoRequest}
              loading={loading}
            >
              Undo Delete Request
            </Button>
          ) : (
            <>
              <Button
                type="primary"
                size="large"
                shape="round"
                className="w-full"
                style={{ border: "1px solid #FB2C36", background: "#FFF", color: "#FB2C36" }}
                onClick={() => setConfirmVisible(true)}
                loading={loading}
              >
                Delete Account
              </Button>
  
              {/* Modal */}
              <Modal
                title="Confirm Account Deletion"
                open={confirmVisible}
                onCancel={() => setConfirmVisible(false)}
                footer={null}
                centered
              >
                {/* Chọn lý do */}
                <Radio.Group onChange={(e) => setReason(e.target.value)} value={reason} className="flex flex-col gap-2 mb-4">
                  {predefinedReasons.map((r, i) => (
                    <Radio key={i} value={r}>
                      {r}
                    </Radio>
                  ))}
                </Radio.Group>
  
                <p className="mb-2">
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
                  className="mb-4"
                />
  
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  className="w-full px-8 py-2 sm:px-6 sm:py-4"
                  style={{ border: "1px solid #FB2C36", background: "#FB2C36", color: "#FFF" }}
                  disabled={confirmText !== requiredPhrase || !reason}
                  loading={loading}
                  onClick={handleConfirmDelete}
                >
                  Confirm Delete
                </Button>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );

}
export default DeleteAccount;
