import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";
const api = axios.create({ baseURL: API_URL });

export const getChatBot = (message) => api.post("/chatbot", { message });
