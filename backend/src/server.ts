import http from "http";
import app from "./app";
import { Server } from "socket.io";

const server = http.createServer(app);

// Optional (Socket.IO setup)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});