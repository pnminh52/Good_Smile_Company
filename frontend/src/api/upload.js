import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL
  ? `${import.meta.env.VITE_REACT_APP_API_URL}`
  : "http://localhost:3000/api";

export const uploadImage = async (formData) => {
  const res = await axios.post(`${API}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
