import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

// GET all banners
export const getBanners = () => api.get("/banners");

// GET banner by id
export const getBannerById = (id) => api.get(`/banners/${id}`);

// CREATE banner
export const createBanner = (data) => api.post("/banners", data);

// UPDATE banner
export const updateBanner = (id, data) => api.put(`/banners/${id}`, data);

// DELETE banner
export const deleteBanner = (id) => api.delete(`/banners/${id}`);
