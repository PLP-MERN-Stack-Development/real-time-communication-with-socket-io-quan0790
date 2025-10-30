import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Allow your frontend to connect
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React app port
    methods: ["GET", "POST"],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("✅ Socket.io Chat Server is running!");
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("🟢 New user connected:", socket.id);

  // When a user sends a message
  socket.on("chatMessage", (data) => {
    console.log("💬 Message received:", data);
    // Broadcast to all connected clients
    io.emit("chatMessage", data);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
