import React, { useState, useEffect } from "react";
import { Modal, Input, Radio, Button, message as toast, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { requestDeleteAccount, cancelDeleteAccount } from "../../../api/account";
import { getProfile } from "../../../api/auth";
import useToast from "../../../hook/useToast";
import { getUserOrders } from "../../../api/orders";

const DeleteAccount = ({handdleLogOut}) => {
    const toast=useToast()
  const [reason, setReason] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [hasRequested, setHasRequested] = useState(false);
const [profileLoading, setProfileLoading] = useState(true); 
const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const requiredPhrase = "I want to delete my account";

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
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);
  

  const handleCopyPhrase = async () => {
    try {
      await navigator.clipboard.writeText(requiredPhrase);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text.");
    }
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const res = await getUserOrders(token);
      const orders = res.data || [];
            const hasActiveOrder = orders.some(o => o.status_id === 1 || o.status_id === 2);
  
      if (hasActiveOrder) {
        toast.error(
          "You have active orders (Pending or Processing). You cannot delete your account until all such orders are completed or canceled."
        );
        setLoading(false)
        return;
      }
        await requestDeleteAccount(reason);
       
      toast.success("Your delete request has been sent!");
      handdleLogOut()
      setHasRequested(true);
  
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to send delete request.");
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
      handdleLogOut()
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to cancel delete request.");
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
              style={{ border: "1px solid #DC2626", background: "#FFF", color: "#DC2626" }}
              onClick={handleUndoRequest}
              loading={loading || profileLoading}
              disabled={profileLoading}
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
                style={{ border: "1px solid #DC2626", background: "#FFF", color: "#DC2626" }}
                onClick={() => setConfirmVisible(true)}
                loading={loading || profileLoading}
                disabled={profileLoading}
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
                styles={{ padding: 0 }}
                style={{ maxWidth: "95%" }}
              >
                <p>Please select a reason for delete your account:</p>
               <Radio.Group
  onChange={(e) => setReason(e.target.value)}
  value={reason}
  className="flex flex-col gap-2 "
>
  {predefinedReasons.map((r, i) => (
    <Radio
      key={i}
      value={r}
      style={{ display: "block" }}
    >
      {r}
    </Radio>
  ))}
</Radio.Group>

  
                <p className="pb-2">
                  This action <strong>cannot be undone</strong>. Type the phrase below:
                </p>
                <div className="bg-gray-100  rounded text-sm font-mono flex items-center justify-between">
                  <span className="pl-2">{requiredPhrase}</span>
                  <Tooltip title="Copy phrase">
                    <Button icon={<CopyOutlined />} type="text" onClick={handleCopyPhrase} />
                  </Tooltip>
                </div>
               <div className="py-2">
                 <Input
                                  value={confirmText}
                                  onChange={(e) => setConfirmText(e.target.value)}
                                  placeholder="Type the confirmation phrase exactly..."
                                  className=""
                                />
               </div>
  
                <Button
                  type="primary"
                  size="medium"
                  shape="round"
                  className="w-full "
                  style={{ border: "1px solid #DC2626", background: "#DC2626", color: "#FFF" }}
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
