import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import useToast from "../../hook/useToast";

const ResetPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid or missing reset link");
      navigate("/login");
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) return toast.error("Please enter new password!");
    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters!");

    setLoading(true);
    try {
      await resetPassword({ email, token, newPassword });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Reset password failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto px-4 sm:px-30">
      <div className="mx-auto py-10">
        <h2 className="text-2xl w-full flex justify-center font-semibold">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold">New Password</p>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF6900] text-white py-3 rounded-full font-semibold cursor-pointer"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
