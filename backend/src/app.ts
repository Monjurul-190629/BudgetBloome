import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes"
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// auth
app.use("/api/auth", authRoutes);
// user // protected routes
app.use("/api/user", userRoutes)

// routes
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend is working perfectly");
});

export default app;