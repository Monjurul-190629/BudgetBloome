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
exports.GoalService = void 0;
const goal_model_1 = __importDefault(require("../../models/goal.model"));
const ApiError_1 = require("../../utils/ApiError");
class GoalService {
    static createGoal(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, amount, description } = data;
            if (!name || !amount) {
                throw new ApiError_1.AppError("Name and amount are required", 400);
            }
            if (amount <= 0) {
                throw new ApiError_1.AppError("Amount must be greater than 0", 400);
            }
            return yield goal_model_1.default.create({
                user: userId,
                name,
                amount,
                description: description || "",
                filled: false,
            });
        });
    }
    static getGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const goals = yield goal_model_1.default.find({ user: userId }).sort({ createdAt: -1 });
            const numberOfFilled = yield goal_model_1.default.countDocuments({
                user: userId,
                filled: true,
            });
            return {
                numberOfFilled,
                data: goals,
            };
        });
    }
    static updateGoal(userId, goalId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, amount, filled, description } = data;
            const updateData = {};
            if (name !== undefined)
                updateData.name = name;
            if (amount !== undefined) {
                if (amount <= 0) {
                    throw new ApiError_1.AppError("Amount must be greater than 0", 400);
                }
                updateData.amount = amount;
            }
            if (filled !== undefined)
                updateData.filled = filled;
            if (description !== undefined) {
                updateData.description = description;
            }
            const goal = yield goal_model_1.default.findOneAndUpdate({ _id: goalId, user: userId }, updateData, { new: true, runValidators: true });
            if (!goal) {
                throw new ApiError_1.AppError("Goal not found", 404);
            }
            return goal;
        });
    }
    static deleteGoal(userId, goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield goal_model_1.default.findOneAndDelete({
                _id: goalId,
                user: userId,
            });
            if (!goal) {
                throw new ApiError_1.AppError("Goal not found", 404);
            }
            return goal;
        });
    }
}
exports.GoalService = GoalService;
