import React, { useState } from "react";
import { Modal, Select, Button, Spin, List, Typography, Image, Tag } from "antd";
import { updateOrderStatus } from "../../../api/orders";
import useToast from "../../../hook/useToast";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const { Option } = Select;
const { Text } = Typography;

const PopupDetails = ({ order, onClose, token, onUpdated }) => {
  const [status, setStatus] = useState(order.status_id);
  const [loading, setLoading] = useState(false);
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
    const getPaymentTag =(method)=>{
      let color = method === "Online Banking" ? "blue":"green"
      return <Tag color={color}>{method}</Tag>
    }
    const handleCancel = () => {
      if (order.status === "Canceled") {
        toast.error("Order is already canceled!");
        return;
      }
    
      Modal.confirm({
        title: "Confirm cancel",
        content: "Are you sure you want to cancel this order?",
        okText: "Yes, cancel",
        centered: true,
        cancelText: "No",
        okType: "danger",
        onOk: async () => {
          try {
            setLoading(true);
            await updateOrderStatus(order.id, 4, token); // cancel order
            toast.success("Order canceled successfully!");
            if (onUpdated) onUpdated();
            onClose();
          } catch (err) {
            toast.error("Failed to cancel order!");
          } finally {
            setLoading(false);
          }
        },
      });
    };
  return (
   <div className="hide-scrollbar">
     <Modal
      open={true}
      onCancel={onClose}
      title={`Order #${order.id}`}
      centered
      footer={null} 
      styles={{ padding: 0 }}
      style={{ maxWidth: "95%" }}
    >
      <Spin spinning={loading}>
        <div className="space-y-1">
        <p>
                <span className="font-semibold">Total price</span>{" "}
                {Number(order.total).toLocaleString("vi-VN")} <span className="underline">đ</span>
              </p>
              <p>
                <span className="font-semibold">Total items in order</span> {order.items?.length || 0}
              </p>
             
              <p>
                <span className="font-semibold">User address/district at </span>{" "}
                {[order.address, order.district].filter(Boolean).join(", ")}
              </p>
              <p>
  <span className="font-semibold">Orderer & Consignee </span>{" "}
  {order.user_name}
</p>

<p>
  <span className="font-semibold">Contact phone number </span>{" "}
  {order.user_phone}
</p>

          <p>
            <Text strong>Order created at</Text>{" "}
            {dayjs(order.created_at).format("DD/MM/YYYY HH:mm")}
          </p>
          <p className="flex items-center gap-1">
                <span className="font-semibold">Order status</span> <span>{getStatusTag(order.status)}</span>
              </p>
              <p className="flex items-center gap-1">
                <span className="font-semibold">Payment method using</span><span>{getPaymentTag(order.payment_method)}</span>

              </p>
        </div>

      

        

        <div className="">
        
          {!order.items || order.items.length === 0 ? (
            <p>No items</p>
          ) : (
            <div className="space-y-2 pt-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex  gap-2 p-0  rounded-lg ">
               
                <img
                                 src={item.base_image}
                                 alt={item.name}
                                 className="w-24 h-24 object-cover rounded-md"
                               />
                <div className="flex flex-col ">
                  <p className="font-medium ">{item.name} </p>
                  <p className="text-gray-600"><span className="">{Number(item.price).toLocaleString("vi-VN")} đ</span> / {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          
          )}
        </div>
        
      </Spin>
      {order.status !== "Canceled" && order.status !=="Completed" &&(
  <div className="pt-4 flex flex-col gap-2">
    <Button
      type="primary"
      size="large"
      shape="round"
      className="w-full"
      style={{ background: "#DC2626", borderColor: "#DC2626" }}

      onClick={handleCancel} 
      loading={loading}
    >
      Cancel Order
    </Button>
  </div>
)}

    </Modal>
   </div>
  );
};

export default PopupDetails;
