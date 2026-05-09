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
exports.TargetedExpenseService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const targetedExpense_model_1 = __importDefault(require("../../models/targetedExpense.model"));
const transaction_model_1 = __importDefault(require("../../models/transaction.model"));
const ApiError_1 = require("../../utils/ApiError");
class TargetedExpenseService {
    static getExpenseByDateRange(userId, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const matchQuery = {
                user: new mongoose_1.default.Types.ObjectId(userId),
                type: "expense",
            };
            if (from || to) {
                matchQuery.created_date = {};
                if (from) {
                    const fromDate = new Date(from);
                    fromDate.setHours(0, 0, 0, 0);
                    matchQuery.created_date.$gte = fromDate;
                }
                if (to) {
                    const toDate = new Date(to);
                    toDate.setHours(23, 59, 59, 999);
                    matchQuery.created_date.$lte = toDate;
                }
            }
            const result = yield transaction_model_1.default.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: null,
                        total_expense: { $sum: "$amount" },
                    },
                },
            ]);
            return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total_expense) || 0;
        });
    }
    static createTargetedExpense(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, amount } = data;
            if (!name || amount === undefined) {
                throw new ApiError_1.AppError("Name and amount are required", 400);
            }
            if (Number(amount) <= 0) {
                throw new ApiError_1.AppError("Amount must be greater than 0", 400);
            }
            const result = yield targetedExpense_model_1.default.create({
                user: userId,
                name,
                amount: Number(amount),
                filled: false,
            });
            return result;
        });
    }
    static getTargetedExpenses(userId, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetQuery = {
                user: userId,
            };
            if (from || to) {
                targetQuery.createdAt = {};
                if (from) {
                    const fromDate = new Date(from);
                    fromDate.setHours(0, 0, 0, 0);
                    targetQuery.createdAt.$gte = fromDate;
                }
                if (to) {
                    const toDate = new Date(to);
                    toDate.setHours(23, 59, 59, 999);
                    targetQuery.createdAt.$lte = toDate;
                }
            }
            const targets = yield targetedExpense_model_1.default.find(targetQuery).sort({
                createdAt: -1,
            });
            const totalExpense = yield this.getExpenseByDateRange(userId, from, to);
            const totalTargetedExpense = targets.reduce((acc, target) => acc + target.amount, 0);
            const formattedTargets = targets.map((target) => (Object.assign(Object.assign({}, target.toObject()), { filled: target.filled })));
            return {
                targets: formattedTargets,
                totalExpense,
                totalTargetedExpense,
            };
        });
    }
    static updateTargetedExpense(userId, targetId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = yield targetedExpense_model_1.default.findOne({
                _id: targetId,
                user: userId,
            });
            if (!target) {
                throw new ApiError_1.AppError("Targeted expense not found", 404);
            }
            if (data.name !== undefined) {
                target.name = data.name;
            }
            if (data.amount !== undefined) {
                if (Number(data.amount) <= 0) {
                    throw new ApiError_1.AppError("Amount must be greater than 0", 400);
                }
                target.amount = Number(data.amount);
            }
            if (data.filled !== undefined) {
                target.filled = Boolean(data.filled);
            }
            yield target.save();
            return target;
        });
    }
    static deleteTargetedExpense(userId, targetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = yield targetedExpense_model_1.default.findOneAndDelete({
                _id: targetId,
                user: userId,
            });
            if (!target) {
                throw new ApiError_1.AppError("Targeted expense not found", 404);
            }
            return target;
        });
    }
}
exports.TargetedExpenseService = TargetedExpenseService;
