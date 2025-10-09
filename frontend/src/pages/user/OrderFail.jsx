import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderFail = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const orderId = params.get("orderId");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] mt-16 text-center px-4">
      <h1 className="text-xl font-semibold ">
      You have canceled this order.
      </h1>



      <p className="text-gray-600 pb-4">
        Please try again or contact our support if the problem persists.
      </p>

      <div className="flex sm:flex-row flex-col gap-2 w-full sm:w-auto">
        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto px-6 py-2 border rounded-full border-[#FF6900] cursor-pointer text-white bg-[#FF6900] "
          >
          Return to homepage
        </button>
        <button
          onClick={() => navigate("/product")}
          className="w-full sm:w-auto px-6 py-2 border rounded-full border-[#FF6900] cursor-pointer text-[#FF6900]  "
          >
          Continue shopping
        </button>
      </div>
    </div>
  );
};

export default OrderFail;
