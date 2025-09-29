import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL
  ? import.meta.env.VITE_REACT_APP_API_URL
  : "http://localhost:3000/api";

const api = axios.create({ baseURL: API });

export const getShippingFee = (region) => api.get("/shipping", { params: { region } });
