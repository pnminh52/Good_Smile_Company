import { toast } from "react-toastify";

const useToast = () => {
  const success = (msg) => {
    toast.success(msg || "Success!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const error = (msg) => {
    toast.error(msg || "Something went wrong!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const info = (msg) => {
    toast.info(msg || "Info", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  return { success, error, info };
};

export default useToast;
