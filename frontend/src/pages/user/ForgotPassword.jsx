import { useState } from "react";
import { forgotPassword } from "../../api/auth";
import useToast from "../../hook/useToast";

const ForgotPassword = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email!");
    setLoading(true);
    try {
      await forgotPassword(email); 
      toast.success("Check your email for reset link!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error sending reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto px-4 sm:px-30 ">
      <div className="mx-auto py-10">
        <h2 className="text-2xl w-full flex justify-center font-semibold">Forgot password?</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold">Email Address</p>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-400 px-3 py-2 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF6900] text-white py-3 rounded-full font-semibold cursor-pointer"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
