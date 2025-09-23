import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
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

