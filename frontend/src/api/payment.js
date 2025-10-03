import axios from "axios";
const API = import.meta.env.VITE_REACT_APP_API_URL
  ? `${import.meta.env.VITE_REACT_APP_API_URL}/payment`
  : "http://localhost:3000/api/payment";

export const createVnpayPayment = (data) =>
  axios.post(`${API}/create-payment`, data);

export const verifyVnpayPaymentReturn = (params) =>
  axios.get(`${API}/payment-return`, { params });

export const vnpayIpn = (params) =>
  axios.get(`${API}/ipn`, { params });
