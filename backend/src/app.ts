import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes"
import { errorHandler } from "./middlewares/error.middleware";
import walletRoutes from "./modules/wallet/wallet.routes";
import transactionRoutes from "./modules/transaction/transaction.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// auth
app.use("/api/auth", authRoutes);
// user // protected routes
app.use("/api/user", userRoutes)
//  wallet
app.use("/api/wallets", walletRoutes);
// transaction
app.use("/api/transactions", transactionRoutes);

// routes
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend is working perfectly");
});

export default app;