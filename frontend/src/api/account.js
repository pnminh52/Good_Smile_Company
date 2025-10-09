import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Tự động đính kèm token nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const requestDeleteAccount = async (reason) => {
  const res = await api.post("/account/request-delete", { reason });
  return res.data;
};

export const getDeleteRequests = async () => {
  const res = await api.get("/account/delete-requests");
  return res.data;
};

export const confirmDeleteAccount = async ({ requestId, action }) => {
  const res = await api.post("/account/confirm-delete", { requestId, action });
  return res.data;
};

// 🆕 Thêm API hủy yêu cầu xóa tài khoản
export const cancelDeleteAccount = async () => {
  const res = await api.post("/account/cancel-delete");
  return res.data;
};


export const handleLockAccount=async()=>{
  const res= await api.post("/account/lock-account")
  return res.data
}

export const handleUnlockAccount=async()=>{
  const res= await api.post("/account/unlock-account")
  return res.data
}

export const getAllUsers=async()=>{
  const res= await api.get("/account/users")
  return res.data
}
