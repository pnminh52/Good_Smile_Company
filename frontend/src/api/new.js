import axios from "axios";

const API_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const getAllNews = () => {
  return api.get("/news");
};

export const createNews = (data) => {
  return api.post("/news", data);
};

export const updateNews = (id, data) => {
  return api.put(`/news/${id}`, data);
};

export const getNewsById = (id) => {
  return api.get(`/news/${id}`);
};

export const deleteNews = (id) => {
  return api.delete(`/news/${id}`);
};
