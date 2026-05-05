import express from "express";
import { GoalController } from "./goal.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, GoalController.createGoal);
router.get("/", protect, GoalController.getGoals);
router.put("/:id", protect, GoalController.updateGoal);
router.delete("/:id", protect, GoalController.deleteGoal);

export default router;