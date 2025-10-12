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

    export const updateOrderStatus = async (id, status_id, token, cancel_reason = null) => {
      try {
        const res = await api.put(
          `/orders/${id}/status`,
          { status_id, cancel_reason },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
          return res.data;
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data?.error || "Failed to update order status");
        }
        throw new Error("Network error");
      }
    };
    

  
