import express from "express";
import { WalletController } from "./wallet.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, WalletController.createWallet);
router.get("/", protect, WalletController.getAllWallets);
router.get("/total-balance", protect, WalletController.getTotalBalance);
router.put("/:id", protect, WalletController.updateWallet);
router.delete("/:id", protect, WalletController.deleteWallet);

export default router;