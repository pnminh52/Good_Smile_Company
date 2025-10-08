import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const requestDeleteAccount = async (token, reason) => {
  const res = await api.post(
    "/account/request-delete",
    { reason },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const getDeleteRequests = async (token) => {
  const res = await api.get("/account/delete-requests", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const confirmDeleteAccount = async (token, { requestId, action }) => {
  const res = await api.post(
    "/account/confirm-delete",
    { requestId, action }, 
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
