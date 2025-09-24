import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: `${API_URL}`,
});


export const getCart = (token) =>
  api.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (data, token) =>
  api.post("/cart", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCartItem = (id, data, token) =>
  api.put(`/cart/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteCartItem = (id, token) =>
  api.delete(`/cart/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const clearCart = (token) =>
    api.delete("/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
    });