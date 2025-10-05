import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy orderId từ query string
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Thanh toán thành công 🎉
      </h1>

      {orderId && (
        <p className="text-gray-600 mb-6">
          Mã đơn hàng của bạn: <span className="font-semibold">{orderId}</span>
        </p>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/order")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition"
        >
          Xem đơn hàng
        </button>
        <button
          onClick={() => navigate("/")}
          className="border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-xl transition"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
