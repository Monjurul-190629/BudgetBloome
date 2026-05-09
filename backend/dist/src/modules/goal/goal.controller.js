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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalController = void 0;
const goal_service_1 = require("./goal.service");
class GoalController {
    static createGoal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield goal_service_1.GoalService.createGoal(req.user._id, req.body);
            res.status(201).json({
                message: "Goal created successfully",
                data: result,
            });
        });
    }
    static getGoals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield goal_service_1.GoalService.getGoals(req.user._id);
            res.status(200).json({
                message: "Goals retrieved successfully",
                data: result.data,
                numberOfFilled: result.numberOfFilled,
            });
        });
    }
    static updateGoal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield goal_service_1.GoalService.updateGoal(req.user._id, req.params.id, req.body);
            res.status(200).json({
                message: "Goal updated successfully",
                data: result,
            });
        });
    }
    static deleteGoal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield goal_service_1.GoalService.deleteGoal(req.user._id, req.params.id);
            res.status(200).json({
                message: "Goal deleted successfully",
            });
        });
    }
}
exports.GoalController = GoalController;
