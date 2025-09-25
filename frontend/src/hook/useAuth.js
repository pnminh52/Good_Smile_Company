import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

let _logout; 

export const setLogoutRef = (logoutFn) => {
  _logout = logoutFn;
};

export const getAuth = () => {
  return { logout: _logout };
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
