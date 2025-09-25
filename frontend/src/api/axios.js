import axios from "axios";
import { getAuth } from "../hook/useAuth";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Tự động logout khi 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const { logout } = getAuth(); // lấy logout từ context
      if (logout) logout();         // reset user + token
      window.location.href = "/login"; // chuyển sang trang login
    }
    return Promise.reject(error);
  }
);

// Gắn token tự động
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
