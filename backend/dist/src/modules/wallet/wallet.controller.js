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
exports.WalletController = void 0;
const wallet_service_1 = require("./wallet.service");
class WalletController {
    static createWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield wallet_service_1.WalletService.createWallet(req.user._id, req.body);
                res.status(201).json({
                    message: "Wallet created successfully",
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
    static getAllWallets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield wallet_service_1.WalletService.getAllWallets(req.user._id);
                res.status(200).json({
                    message: "Wallets fetched successfully",
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
    static getTotalBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield wallet_service_1.WalletService.getTotalBalance(req.user._id);
                res.status(200).json({
                    message: "Total balance fetched successfully",
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
    static updateWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield wallet_service_1.WalletService.updateWallet(req.user._id, req.params.id, req.body);
                res.status(200).json({
                    message: "Wallet updated successfully",
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
    static deleteWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield wallet_service_1.WalletService.deleteWallet(req.user._id, req.params.id);
                res.status(200).json({
                    message: "Wallet deleted successfully",
                });
            }
            catch (err) {
                res.status(err.statusCode || 400).json({
                    message: err.message,
                });
            }
        });
    }
}
exports.WalletController = WalletController;
