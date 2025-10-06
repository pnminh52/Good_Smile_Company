import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const getUserOrders = (token) =>
  api.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const getAllOrders = (token) =>
    api.get("/orders/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
  
export const getOrderDetail = (id, token) =>
  api.get(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  export const createOrder = (data, token) =>
    api.post("/orders/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

export const updateOrderStatus = (id, status_id, token) =>
  api.put(
    `/orders/${id}/status`,
    { status_id },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
