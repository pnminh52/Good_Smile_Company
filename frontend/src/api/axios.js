import { useLogout } from "../hook/useLogout"; 


let logoutCallback = null;

export const setLogoutCallback = (cb) => {
  logoutCallback = cb;
};

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (logoutCallback) logoutCallback(); // callback navigate
    }
    return Promise.reject(error);
  }
);
