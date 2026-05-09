"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_model_1 = __importDefault(require("../../models/transaction.model"));
const wallet_model_1 = __importDefault(require("../../models/wallet.model"));
const ApiError_1 = require("../../utils/ApiError");
class TransactionService {
    static createTransaction(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { wallet, category_name, description, amount, created_date, type } = data;
            if (!wallet || !category_name || !amount || !type) {
                throw new ApiError_1.AppError("Wallet, category name, amount and type are required", 400);
            }
            if (!["income", "expense"].includes(type)) {
                throw new ApiError_1.AppError("Invalid transaction type", 400);
            }
            if (amount <= 0) {
                throw new ApiError_1.AppError("Amount must be greater than 0", 400);
            }
            const selectedWallet = yield wallet_model_1.default.findOne({
                _id: wallet,
                user: userId,
            });
            if (!selectedWallet) {
                throw new ApiError_1.AppError("Wallet not found", 404);
            }
            if (type === "expense" && selectedWallet.amount < amount) {
                throw new ApiError_1.AppError("Insufficient wallet balance", 400);
            }
            const balanceChange = type === "income" ? amount : -amount;
            const transaction = yield transaction_model_1.default.create({
                user: userId,
                wallet,
                category_name,
                description,
                amount,
                type,
                created_date: created_date || new Date(),
            });
            yield wallet_model_1.default.findOneAndUpdate({
                _id: wallet,
                user: userId,
            }, {
                $inc: {
                    amount: balanceChange,
                },
            });
            return transaction;
        });
    }
    static getTransactionHistory(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 5;
            const skip = (page - 1) * limit;
            let fromDate;
            let toDate;
            if (query.from && query.to) {
                fromDate = new Date(query.from);
                toDate = new Date(query.to);
            }
            else {
                const now = new Date();
                fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
                toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            }
            toDate.setHours(23, 59, 59, 999);
            const filter = {
                user: userId,
                created_date: {
                    $gte: fromDate,
                    $lte: toDate,
                },
            };
            if (query.type && ["income", "expense"].includes(query.type)) {
                filter.type = query.type;
            }
            const transactions = yield transaction_model_1.default.find(filter)
                .populate("wallet", "wallet_name amount")
                .sort({ created_date: -1 })
                .skip(skip)
                .limit(limit);
            const total = yield transaction_model_1.default.countDocuments(filter);
            const totalExpenseResult = yield transaction_model_1.default.aggregate([
                {
                    $match: {
                        user: new mongoose_1.default.Types.ObjectId(userId),
                        type: "expense",
                        created_date: {
                            $gte: fromDate,
                            $lte: toDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total_expense: { $sum: "$amount" },
                    },
                },
            ]);
            const totalIncomeResult = yield transaction_model_1.default.aggregate([
                {
                    $match: {
                        user: new mongoose_1.default.Types.ObjectId(userId),
                        type: "income",
                        created_date: {
                            $gte: fromDate,
                            $lte: toDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total_income: { $sum: "$amount" },
                    },
                },
            ]);
            return {
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
                total_expense: ((_a = totalExpenseResult[0]) === null || _a === void 0 ? void 0 : _a.total_expense) || 0,
                total_income: ((_b = totalIncomeResult[0]) === null || _b === void 0 ? void 0 : _b.total_income) || 0,
                data: transactions,
            };
        });
    }
    static getTransactionLastSevenDays(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - 6);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(today);
            endDate.setHours(23, 59, 59, 999);
            const result = yield transaction_model_1.default.aggregate([
                {
                    $match: {
                        user: new mongoose_1.default.Types.ObjectId(userId),
                        created_date: {
                            $gte: startDate,
                            $lte: endDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            date: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$created_date",
                                },
                            },
                            type: "$type",
                        },
                        total: { $sum: "$amount" },
                    },
                },
            ]);
            const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + index);
                const formattedDate = date.toISOString().split("T")[0];
                const incomeData = result.find(item => item._id.date === formattedDate && item._id.type === "income");
                const expenseData = result.find(item => item._id.date === formattedDate && item._id.type === "expense");
                return {
                    date: formattedDate,
                    day: date.toLocaleString("default", { weekday: "long" }),
                    income: (incomeData === null || incomeData === void 0 ? void 0 : incomeData.total) || 0,
                    expense: (expenseData === null || expenseData === void 0 ? void 0 : expenseData.total) || 0,
                };
            });
            return lastSevenDays;
        });
    }
    static getTotalExpense(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield transaction_model_1.default.aggregate([
                {
                    $match: {
                        user: new mongoose_1.default.Types.ObjectId(userId),
                        type: "expense",
                    },
                },
                {
                    $group: {
                        _id: null,
                        total_expense: { $sum: "$amount" },
                    },
                },
            ]);
            return {
                total_expense: ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total_expense) || 0,
            };
        });
    }
    static getTotalIncome(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { from, to } = query;
            if (!from || !to) {
                throw new ApiError_1.AppError("From date and to date are required", 400);
            }
            const fromDate = new Date(from);
            const toDate = new Date(to);
            if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                throw new ApiError_1.AppError("Invalid date format", 400);
            }
            toDate.setHours(23, 59, 59, 999);
            const result = yield transaction_model_1.default.aggregate([
                {
                    $match: {
                        user: new mongoose_1.default.Types.ObjectId(userId),
                        type: "income",
                        created_date: {
                            $gte: fromDate,
                            $lte: toDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total_income: { $sum: "$amount" },
                    },
                },
            ]);
            return {
                from: fromDate,
                to: toDate,
                total_income: ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total_income) || 0,
            };
        });
    }
    static deleteTransaction(userId, transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transaction_model_1.default.findOne({
                _id: transactionId,
                user: userId,
            });
            if (!transaction) {
                throw new ApiError_1.AppError("Transaction not found", 404);
            }
            const balanceChange = transaction.type === "income" ? -transaction.amount : transaction.amount;
            yield wallet_model_1.default.findOneAndUpdate({
                _id: transaction.wallet,
                user: userId,
            }, {
                $inc: {
                    amount: balanceChange,
                },
            });
            yield transaction_model_1.default.findByIdAndDelete(transactionId);
            return transaction;
        });
    }
}
exports.TransactionService = TransactionService;
