import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL
  ? `${import.meta.env.VITE_REACT_APP_API_URL}`
  : "http://localhost:3000/api";

const api = axios.create({
  baseURL: API,
});

// GET wishlist của user
export const getWishlistApi = async (userId, token) => {
  const res = await api.get(`/wishlist/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Thêm sản phẩm vào wishlist
export const addToWishlistApi = async (userId, productId, token) => {
  const res = await api.post(
    `/wishlist/add`,
    { userId, productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Xóa sản phẩm khỏi wishlist
export const removeFromWishlistApi = async (userId, productId, token) => {
  const res = await api.delete(`/wishlist/remove`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { userId, productId },
  });
  return res.data;
};
