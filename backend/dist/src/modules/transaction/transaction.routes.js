"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, transaction_controller_1.TransactionController.createTransaction);
router.get("/", auth_middleware_1.protect, transaction_controller_1.TransactionController.getTransactionHistory);
router.get("/total-expense", auth_middleware_1.protect, transaction_controller_1.TransactionController.getTotalExpense);
router.delete("/:id", auth_middleware_1.protect, transaction_controller_1.TransactionController.deleteTransaction);
router.get("/total-income", auth_middleware_1.protect, transaction_controller_1.TransactionController.getTotalIncome);
router.get("/last-seven-days", auth_middleware_1.protect, transaction_controller_1.TransactionController.getTransactionLastSevenDays);
exports.default = router;
