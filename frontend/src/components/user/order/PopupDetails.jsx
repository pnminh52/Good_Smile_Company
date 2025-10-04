import React, { useState } from "react";
import { Modal, Select, Button, Spin, List, Typography, Image, Tag } from "antd";
import { updateOrderStatus } from "../../../api/orders";
import useToast from "../../../hook/useToast";
import dayjs from "dayjs";

const { Option } = Select;
const { Text } = Typography;

const PopupDetails = ({ order, onClose, token, onUpdated }) => {
  const [status, setStatus] = useState(order.status_id);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSave = async () => {
    if (order.status_id >= 4) {
      toast.error("Order already canceled!");
      return;
    }
  
    try {
      setLoading(true);
      await updateOrderStatus(order.id, 4, token); 
      if (onUpdated) onUpdated();
      onClose();
      toast.success("Order canceled successfully!");
    } catch (err) {
      toast.error("Failed to cancel order!");
    } finally {
      setLoading(false);
    }
  };
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
  
    const getPaymentTag =(method)=>{
      let color = method === "Online Banking" ? "blue":"green"
      return <Tag color={color}>{method}</Tag>
    }
  return (
   <div className="hide-scrollbar">
     <Modal
      open={true}
      onCancel={onClose}
      title={`Order #${order.id}`}
      centered
      width={600} 
      styles={{ padding: 0 }}
      style={{ maxWidth: "95%" }}
     
      footer={[
        <Button
          key="save"
          onClick={handleSave}
          loading={loading}
          className="w-full"
          style={{
            backgroundColor: "#FF6624",
            color: "white",
            fontWeight: 600,
            borderRadius: "9999px",
            border: "none",
            height: "45px",
          }}
        >
          Save
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <div className="space-y-2">
        <p>
                <span className="font-semibold">Total price</span>{" "}
                {Number(order.total).toLocaleString("vi-VN")} <span className="underline">đ</span>
              </p>
              <p>
                <span className="font-semibold">Total items in order</span> {order.items?.length || 0}
              </p>
              <p className="flex items-center gap-1">
                <span className="font-semibold">Order status</span> <span>{getStatusTag(order.status)}</span>
              </p>
              <p className="flex items-center gap-1">
                <span className="font-semibold">Payment method using</span><span>{getPaymentTag(order.payment_method)}</span>

              </p>
              <p>
                <span className="font-semibold">User address/district at </span>{" "}
                {[order.address, order.district].filter(Boolean).join(", ")}
              </p>
          <p>
            <Text strong>Created at</Text>{" "}
            {dayjs(order.created_at).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>

        <div className="">
          <Text strong>Status</Text>
          <Select
  value={status} 
  onChange={(value) => setStatus(value)}
  style={{ width: "100%", maxWidth: 250, marginTop: 8 }}
   disabled={order.status_id === 4}
>
  <Option value={1} disabled={order.status_id !== 1 && order.status_id !== 4}>
    Pending
  </Option>
  <Option value={2} disabled={order.status_id !== 2 && order.status_id !== 4}>
    Processing
  </Option>
  <Option value={3} disabled={order.status_id !== 3 && order.status_id !== 4}>
    Completed
  </Option>
  <Option value={4} disabled={order.status_id === 4}>
    Canceled
  </Option>
</Select>

        </div>

        <div className="mt-2">
          <Text strong>Items</Text>
          {!order.items || order.items.length === 0 ? (
            <p>No items</p>
          ) : (
            <List
              itemLayout="horizontal"
              size="small"
              dataSource={order.items}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={item.base_image}
                        alt={item.name}
                        width={90}
                        height={90}
                        style={{
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    }
                    title={
                      <span className="font-medium">
                        {item.name} x {item.quantity}
                      </span>
                    }
                    description={`${Number(item.price).toLocaleString(
                      "vi-VN"
                    )} đ`}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </Spin>
    </Modal>
   </div>
  );
};

export default PopupDetails;
