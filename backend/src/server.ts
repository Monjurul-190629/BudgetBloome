import http from "http";
import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 8000

// connect db
connectDB();

server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});