import React, { useState } from "react";
import { updateOrderStatus } from "../../../api/orders";
import useToast from "../../../hook/useToast";

const OrderDetails = ({ order }) => {
  const [status, setStatus] = useState(order.status_id);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem("token");

  const statusOptions = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Processing" },
    { id: 3, name: "Completed" },
    { id: 4, name: "Cancelled" },
  ];

  const handleStatusChange = (e) => {
    const newStatus = Number(e.target.value);
  
    // ✅ Completed hoặc Cancelled thì không cho đổi nữa
    if (order.status_id === 3 || order.status_id === 4) {
      toast.error("Đơn hàng đã hoàn tất hoặc bị hủy, không thể cập nhật!");
      return;
    }
  
    // ✅ Cho phép hủy ở bất kỳ trạng thái nào (Pending / Processing đều được)
    if (newStatus === 4) {
      setStatus(newStatus);
      return;
    }
  
    // ✅ Không được quay ngược lại
    if (newStatus < order.status_id) {
      toast.error("Không thể quay lại trạng thái trước đó!");
      return;
    }
  
    // ✅ Không được nhảy bậc (Pending → Completed)
    if (newStatus > order.status_id + 1) {
      toast.error("Không thể bỏ qua trạng thái trung gian!");
      return;
    }
  
    setStatus(newStatus);
  };
  
  
  const handleUpdateStatus = async () => {
    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }
  
    if (order.status_id === 3 || order.status_id === 4) {
      toast.error("Đơn hàng đã hoàn tất hoặc bị hủy, không thể cập nhật!");
      return;
    }
  
    if (status === order.status_id) {
      toast.warning("Trạng thái không có thay đổi!");
      return;
    }
  
    setLoading(true);
    try {
      await updateOrderStatus(order.id, status, token);
      setStatus(status); // ✅ Cập nhật ngay UI
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
      setTimeout(() => window.location.reload(), 500); // ✅ reload sau 0.5s cho mượt
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật trạng thái thất bại!");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
   

      {/* Thông tin người đặt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p><span className="font-semibold">Khách hàng:</span> {order.user_name || "Người dùng ẩn danh"}</p>
          <p><span className="font-semibold">Email:</span> {order.user_email}</p>
          <p><span className="font-semibold">Số điện thoại:</span> {order.user_phone}</p>
          <p><span className="font-semibold">Địa chỉ:</span> {order.address}</p>
          <p><span className="font-semibold">Quận / Huyện:</span> {order.district}</p>
        </div>

        <div className="space-y-1">
          <p><span className="font-semibold">Tổng tiền:</span> {Number(order.total).toLocaleString("vi-VN")} ₫</p>
          <p><span className="font-semibold">Phương thức thanh toán:</span> {order.payment_method_name}</p>
          <p><span className="font-semibold">Ngày tạo:</span> {new Date(order.created_at).toLocaleString("vi-VN")}</p>
          <p>
            <span className="font-semibold">Trạng thái hiện tại:</span>{" "}
            <span className="capitalize">
              {statusOptions.find((s) => s.id === order.status_id)?.name}
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      <div className="flex flex-wrap items-center gap-3">
  <label className="font-medium text-gray-700">Cập nhật trạng thái:</label>
  <select
  value={status}
  onChange={handleStatusChange}
  disabled={order.status_id === 3 || order.status_id === 4}
  className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
    ${order.status_id === 3 || order.status_id === 4
      ? "bg-gray-100 cursor-not-allowed"
      : "focus:ring-blue-500"}`}
>
  {statusOptions.map((opt) => (
    <option
      key={opt.id}
      value={opt.id}
      disabled={
        // ❌ Chặn quay ngược hoặc nhảy bậc, nhưng luôn cho phép chọn Cancelled (4)
        opt.id !== 4 && (opt.id < order.status_id || opt.id > order.status_id + 1)
      }
    >
      {opt.name}
    </option>
  ))}
</select>


  <button
    onClick={handleUpdateStatus}
    disabled={loading || order.status_id === 3 || order.status_id === 4}
    className={`px-5 py-2 rounded-lg text-white font-medium transition 
      ${
        order.status_id === 3 || order.status_id === 4
          ? "bg-gray-400 cursor-not-allowed"
          : loading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
  >
    {loading ? "Đang cập nhật..." : "Cập nhật"}
  </button>
</div>


      <div className="border-t border-gray-200 my-6"></div>

      {/* Danh sách sản phẩm */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Sản phẩm trong đơn hàng:</h3>
        <ul className="space-y-1 list-disc ml-5 text-sm">
          {order.items?.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.quantity} —{" "}
              {Number(item.price).toLocaleString("vi-VN")} ₫
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
