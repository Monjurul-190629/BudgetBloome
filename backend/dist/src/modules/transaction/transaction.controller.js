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
exports.TransactionController = void 0;
const transaction_service_1 = require("./transaction.service");
class TransactionController {
    static createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield transaction_service_1.TransactionService.createTransaction(req.user._id, req.body);
                res.status(201).json({
                    message: "Transaction created successfully",
                    data: result,
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).json({
                    message: err.message,
                });
            }
        });
    }
    static getTransactionHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield transaction_service_1.TransactionService.getTransactionHistory(req.user._id, req.query);
                res.status(200).json({
                    message: "Transaction history fetched successfully",
                    data: result,
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).json({
                    message: err.message,
                });
            }
        });
    }
    static getTotalExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield transaction_service_1.TransactionService.getTotalExpense(req.user._id);
                res.status(200).json({
                    message: "Total expense fetched successfully",
                    data: result,
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).json({
                    message: err.message,
                });
            }
        });
    }
    static deleteTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield transaction_service_1.TransactionService.deleteTransaction(req.user._id, req.params.id);
                res.status(200).json({
                    message: "Transaction deleted successfully",
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).json({
                    message: err.message,
                });
            }
        });
    }
    static getTotalIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield transaction_service_1.TransactionService.getTotalIncome(req.user._id, req.query);
                res.status(200).json({
                    message: "Total income fetched successfully",
                    data: result,
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).json({
                    message: err.message,
                });
            }
        });
    }
    static getTransactionLastSevenDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield transaction_service_1.TransactionService.getTransactionLastSevenDays(req.user._id);
            res.status(200).json({
                message: "Last 7 days transactions fetched successfully",
                data: result,
            });
        });
    }
}
exports.TransactionController = TransactionController;
