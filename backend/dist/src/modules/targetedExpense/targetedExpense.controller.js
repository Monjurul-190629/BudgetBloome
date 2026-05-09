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
exports.TargetedExpenseController = void 0;
const targetExpense_service_1 = require("./targetExpense.service");
class TargetedExpenseController {
    static createTargetedExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield targetExpense_service_1.TargetedExpenseService.createTargetedExpense(req.user._id, req.body);
            res.status(201).json({
                message: "Targeted expense created successfully",
                data: result,
            });
        });
    }
    static getTargetedExpenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to } = req.query;
            const result = yield targetExpense_service_1.TargetedExpenseService.getTargetedExpenses(req.user._id, from, to);
            res.status(200).json({
                message: "Targeted expenses retrieved successfully",
                data: result.targets,
                totalExpense: result.totalExpense,
                totalTargetedExpense: result.totalTargetedExpense,
            });
        });
    }
    static updateTargetedExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield targetExpense_service_1.TargetedExpenseService.updateTargetedExpense(req.user._id, req.params.id, req.body);
            res.status(200).json({
                message: "Targeted expense updated successfully",
                data: result,
            });
        });
    }
    static deleteTargetedExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield targetExpense_service_1.TargetedExpenseService.deleteTargetedExpense(req.user._id, req.params.id);
            res.status(200).json({
                message: "Targeted expense deleted successfully",
            });
        });
    }
}
exports.TargetedExpenseController = TargetedExpenseController;
