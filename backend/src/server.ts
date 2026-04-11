import http from "http";
import app from "./app";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer(app);

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

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});