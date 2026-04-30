import express from "express";
import { TransactionController } from "./transaction.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, TransactionController.createTransaction);
router.get("/", protect, TransactionController.getTransactionHistory);
router.get("/total-expense", protect, TransactionController.getTotalExpense);
router.delete("/:id", protect, TransactionController.deleteTransaction);

export default router;