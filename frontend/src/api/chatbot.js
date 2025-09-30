import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "https://good-smile-company-1.onrender.com/api";
const api = axios.create({ baseURL: API_URL });

export const getChatBot = (message) => api.post("/chatbot", { message });
