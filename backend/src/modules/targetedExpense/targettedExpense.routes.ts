import express from "express";
import { TargetedExpenseController } from "./targetedExpense.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, TargetedExpenseController.createTargetedExpense);

router.get("/", protect, TargetedExpenseController.getTargetedExpenses);

router.patch(
  "/:id",
  protect,
  TargetedExpenseController.updateTargetedExpense,
);

router.delete(
  "/:id",
  protect,
  TargetedExpenseController.deleteTargetedExpense,
);

export default router;