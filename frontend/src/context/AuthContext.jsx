import { createContext, useState, useEffect, useRef } from "react";
import { setLogoutRef } from "./../hook/useAuth";
import socket, { registerSocketUser } from "../socket";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const initialized = useRef(false); 

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);

    setLogoutRef(logout);

    socket.on("force-logout", (data) => {
      alert(data.reason);
      logout();
      window.location.href = "/";
    });

    return () => socket.off("force-logout");
  }, []);

  useEffect(() => {
    if (user?.id) registerSocketUser(user.id);
  }, [user]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
