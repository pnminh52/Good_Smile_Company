import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const orderId = params.get("orderId");

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-green-600">Thanh toán thành công!</h1>
      {orderId && <p className="mt-4">Mã đơn hàng của bạn là: <b>{orderId}</b></p>}
    </div>
  );
};

export default OrderSuccess;
