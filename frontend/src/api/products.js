import axios from "axios";

const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"}`;

const api = axios.create({
    baseURL: API_URL,
});

export const getProducts = () => api.get("/products");

export const getProductById = (id) => api.get(`/products/${id}`);

export const createProduct = (data) => api.post("/products", data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getProductsBySameCategory = (id) => api.get(`/products/${id}/same-category`);

export const getRecommendedProducts = (id) => 
    api.get(`/products/${id}/recommended`);
  
export const getCartRecommendedProducts = (productIds) => 
    api.post("/products/cart-recommend", { productIds });

