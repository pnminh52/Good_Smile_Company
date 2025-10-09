import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL
  ? `${import.meta.env.VITE_REACT_APP_API_URL}/users`
  : "http://localhost:3000/api/users";

const api = axios.create({
  baseURL: API,
});
export { api };
// Đăng ký
export const register = (data) => api.post("/register", data);

// Đăng nhập
export const login = (data) => api.post("/login", data);

// Quên mật khẩu
export const forgotPassword = (email) => api.post("/forgot-password", { email });

// Reset mật khẩu
export const resetPassword = (email, token, newPassword) =>
  api.post("/reset-password", { email, token, newPassword });

// Cập nhật profile
export const updateProfile = (data, token) =>
  api.put("/update-profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const getProfile = (token) =>
    api
      .get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);

  export const changePassword = (data, token) => {
    return api.put("/change-password", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
