import { io } from "socket.io-client";

let socket;

// Connect to the Socket.io server
export const connectSocket = (token) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      auth: { token },
      transports: ["websocket"],
    });
  }
  return socket;
};

// Get existing socket instance
export const getSocket = () => socket;
