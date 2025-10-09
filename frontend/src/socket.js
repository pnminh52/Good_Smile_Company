import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_REACT_APP_API_URL.replace("/api", "");

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false, 
});

export const registerSocketUser = (userId) => {
  if (userId && socket.connected) {
    socket.emit("register", userId);
  }
};

export default socket;
