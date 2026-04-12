import http from "http";
import app from "./app";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 8000

// Optional (Socket.IO setup)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message:", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// connect db
connectDB();

server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});