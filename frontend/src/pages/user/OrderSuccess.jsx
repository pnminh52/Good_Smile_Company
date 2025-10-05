import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const orderId = params.get("orderId");
  const method = params.get("method") || "payment";

  const [countdown, setCountdown] = useState(299); // 299 giây

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) navigate("/");
  }, [countdown, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-[50vh] mt-16 text-center px-4">
      <h1 className="text-xl font-semibold text-gray-800 ">
        {method.toLowerCase() === "cod"
          ? `Order has been placed successfully!`
          : `Order payment successfully!`}
      </h1>

      <p className="text-gray-600 pb-2 ">
      Automatically returned to the homepage after{" "}
        <span className="font-semibold text-[#FF6900]">
          {formatTime(countdown)}
        </span>
      </p>

      <div className="flex sm:flex-row flex-col gap-3 w-full sm:w-auto">
  <button
    onClick={() => navigate("/")}
    className="w-full sm:w-auto px-6 py-2 border rounded-full border-[#FF6900] cursor-pointer text-white bg-[#FF6900] hover:bg-[#ff7d26] transition"
  >
    Return to homepage
  </button>
  <button
    onClick={() => navigate("/product")}
    className="w-full sm:w-auto px-6 py-2 border rounded-full border-[#FF6900] cursor-pointer text-[#FF6900]  transition"
  >
    Continue shopping
  </button>
</div>

    </div>
  );
};

export default OrderSuccess;
