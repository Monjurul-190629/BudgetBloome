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
exports.WalletService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const wallet_model_1 = __importDefault(require("../../models/wallet.model"));
const ApiError_1 = require("../../utils/ApiError");
const transaction_model_1 = __importDefault(require("../../models/transaction.model"));
class WalletService {
    static createWallet(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { wallet_name, amount } = data;
            if (!wallet_name || amount === undefined) {
                throw new ApiError_1.AppError("Wallet name and amount are required", 400);
            }
            if (amount < 0) {
                throw new ApiError_1.AppError("Amount cannot be negative", 400);
            }
            const wallet = yield wallet_model_1.default.create({
                user: userId,
                wallet_name,
                amount,
            });
            if (amount > 0) {
                yield transaction_model_1.default.create({
                    user: userId,
                    wallet: wallet._id,
                    category_name: "Initial Balance",
                    description: "Wallet opening balance",
                    amount,
                    type: "income",
                    created_date: new Date(),
                });
            }
            return wallet;
        });
    }
    static getAllWallets(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallets = yield wallet_model_1.default.find({ user: userId });
            return wallets;
        });
    }
    static getTotalBalance(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield wallet_model_1.default.aggregate([
                {
                    $match: {
                        user: new mongoose_1.default.Types.ObjectId(userId),
                    },
                },
                {
                    $group: {
                        _id: null,
                        total_balance: { $sum: "$amount" },
                    },
                },
            ]);
            return {
                total_balance: ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total_balance) || 0,
            };
        });
    }
    static updateWallet(userId, walletId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield wallet_model_1.default.findOneAndUpdate({
                _id: walletId,
                user: userId,
            }, data, { new: true });
            if (!wallet) {
                throw new ApiError_1.AppError("Wallet not found", 404);
            }
            return wallet;
        });
    }
    static deleteWallet(userId, walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield wallet_model_1.default.findOneAndDelete({
                _id: walletId,
                user: userId,
            });
            if (!wallet) {
                throw new ApiError_1.AppError("Wallet not found", 404);
            }
            return wallet;
        });
    }
}
exports.WalletService = WalletService;
