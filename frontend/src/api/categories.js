import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});
// GET all categories
export const getCategories = () => api.get("/categories");

// GET category by id
export const getCategoryById = (id) => api.get(`/categories/${id}`);

// CREATE category
export const createCategory = (data) => api.post("/categories", data);

// UPDATE category
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);

// DELETE category
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
