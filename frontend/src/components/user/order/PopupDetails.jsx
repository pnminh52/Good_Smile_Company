import React, { useState } from "react";
import { Modal, Button, Spin, Tag, Radio, Input } from "antd";
import { updateOrderStatus } from "../../../api/orders";
import useToast from "../../../hook/useToast";
import dayjs from "dayjs";

const PopupDetails = ({ order, onClose, token, onUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const toast = useToast();

  const getStatusTag = (status) => {
    let color =
      status === "Pending"
        ? "orange"
        : status === "Processing"
        ? "blue"
        : status === "Completed"
        ? "green"
        : "red";
    return <Tag color={color}>{status}</Tag>;
  };

  const getPaymentTag = (method) => {
    let color = method === "Online Banking" ? "blue" : "green";
    return <Tag color={color}>{method}</Tag>;
  };

  const handleCancelOrder = async () => {
    const reasonToSend = selectedReason === "Other" ? customReason : selectedReason;

    if (!reasonToSend || reasonToSend.trim() === "") {
      toast.error("Please enter cancel reason!");
      return;
    }

    try {
      setLoading(true);
      await updateOrderStatus(order.id, 4, token, reasonToSend);
      toast.success("Order canceled successfully!");
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      toast.error("Failed to cancel order!");
    } finally {
      setLoading(false);
      setShowCancelModal(false);
      setSelectedReason("");
      setCustomReason("");
    }
  };

  return (
    <div className="hide-scrollbar">
      <Modal
        open={true}
        onCancel={onClose}
        title={`Order #${order.id}`}
        centered
        footer={null}
        style={{ maxWidth: "95%" }}
      >
        <Spin spinning={loading}>
          {/* Order Info */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Total price:</span>{" "}
              {Number(order.total).toLocaleString("vi-VN")} đ
            </p>
            <p>
              <span className="font-semibold">Total items:</span> {order.items?.length || 0}
            </p>
            <p>
              <span className="font-semibold">Address / District:</span>{" "}
              {[order.address, order.district].filter(Boolean).join(", ")}
            </p>
            <p>
              <span className="font-semibold">Orderer & Consignee:</span> {order.user_name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.user_phone}
            </p>
            <p>
              <span className="font-semibold">Created at:</span>{" "}
              {dayjs(order.created_at).format("DD/MM/YYYY HH:mm")}
            </p>
            <p className="flex items-center gap-1">
              <span className="font-semibold">Order status:</span> {getStatusTag(order.status)}
            </p>
           
            <p className="flex items-center gap-1">
              <span className="font-semibold">Payment method:</span>{" "}
              {getPaymentTag(order.payment_method)}
            </p>
            {order.cancel_reason && (
              <p>
                <span className="font-semibold">Cancel reason:</span> {order.cancel_reason}
              </p>
            )}
          </div>

          {/* Order Items */}
          <div className="mt-4 space-y-2">
            {!order.items || order.items.length === 0 ? (
              <p>No items</p>
            ) : (
              order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2  items-center"
                >
                  <img
                    src={item.base_image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">
                      {Number(item.price).toLocaleString("vi-VN")} đ / {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cancel Order Button */}
          {order.status !== "Canceled" && order.status !== "Completed" && (
            <div className="pt-4 flex flex-col gap-2">
              <Button
                type="primary"
                size="large"
                shape="round"
                className="w-full"
                style={{ background: "#DC2626", borderColor: "#DC2626" }}
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Order
              </Button>
            </div>
          )}

          {/* Cancel Reason Modal */}
          <Modal
            title="Cancel Order"
            open={showCancelModal}
            onCancel={() => setShowCancelModal(false)}
            onOk={handleCancelOrder}
            okText="Cancel Order"
            okType="danger"
            footer={null}
            
            style={{ maxWidth: "95%" }}
           
            centered
          >
            <p>Please select a reason for canceling:</p>
            <Radio.Group
              onChange={(e) => setSelectedReason(e.target.value)}
              value={selectedReason}
              style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop:4 }}
            >
              <Radio value="I changed mind">I changed mind</Radio>
              <Radio value="I found a better price">I found a better price</Radio>
             <Radio value="I want to change my order address">I want to change my order address</Radio>
             <Radio value="Shipping takes too long">Shipping takes too long</Radio>
              <Radio value="Other">Other</Radio>
            </Radio.Group>

            {selectedReason === "Other" && (
              <Input
                placeholder="Enter custom reason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
               style={{marginTop:8}}
              />
            )}
            <Button
                           type="primary"
                           size="medium"
                           shape="round"
                           className="w-full"
                           style={{ background: "#DC2626", borderColor: "#DC2626", marginTop:"8px" }}
                           onClick={handleCancelOrder}
                         >
                           Confirm cancel this Order

            </Button>
          </Modal>
        </Spin>
      </Modal>
    </div>
  );
};

export default PopupDetails;
