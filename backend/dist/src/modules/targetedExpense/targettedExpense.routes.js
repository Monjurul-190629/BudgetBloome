"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const targetedExpense_controller_1 = require("./targetedExpense.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, targetedExpense_controller_1.TargetedExpenseController.createTargetedExpense);
router.get("/", auth_middleware_1.protect, targetedExpense_controller_1.TargetedExpenseController.getTargetedExpenses);
router.put("/:id", auth_middleware_1.protect, targetedExpense_controller_1.TargetedExpenseController.updateTargetedExpense);
router.delete("/:id", auth_middleware_1.protect, targetedExpense_controller_1.TargetedExpenseController.deleteTargetedExpense);
exports.default = router;
