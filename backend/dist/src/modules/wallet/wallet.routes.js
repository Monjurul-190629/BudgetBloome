"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = require("./wallet.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, wallet_controller_1.WalletController.createWallet);
router.get("/", auth_middleware_1.protect, wallet_controller_1.WalletController.getAllWallets);
router.get("/total-balance", auth_middleware_1.protect, wallet_controller_1.WalletController.getTotalBalance);
router.put("/:id", auth_middleware_1.protect, wallet_controller_1.WalletController.updateWallet);
router.delete("/:id", auth_middleware_1.protect, wallet_controller_1.WalletController.deleteWallet);
exports.default = router;
