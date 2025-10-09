import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

const SOCKET_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://good-smile-company-1.onrender.com";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: true,
});

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => console.log("✅ Connected to socket:", socket.id));
    socket.on("disconnect", () => console.log("❌ Disconnected socket"));
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);


export const registerSocketUser = (userId) => {
  if (!userId) return;
  if (socket.connected) {
    socket.emit("register", userId);
    console.log("📡 Registered userId:", userId);
  } else {
    socket.once("connect", () => {
      socket.emit("register", userId);
      console.log("📡 Registered userId (after connect):", userId);
    });
  }
};
