import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes"
import { errorHandler } from "./middlewares/error.middleware";
import walletRoutes from "./modules/wallet/wallet.routes";
import transactionRoutes from "./modules/transaction/transaction.routes";
import goalRoutes from "./modules/goal/goal.routes";
import targetedExpenseRoutes from "./modules/targetedExpense/targettedExpense.routes"
import ticketRoutes from "./modules/ticket/ticket.routes"

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
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
// goals
app.use("/api/goals", goalRoutes);
// targeted expense
app.use("/api/targeted-expenses", targetedExpenseRoutes);
//ticket
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working perfectly");
});

app.use(errorHandler);

export default app;