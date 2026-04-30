import mongoose from "mongoose";
import Wallet from "../../models/wallet.model";
import { AppError } from "../../utils/ApiError";

export class WalletService {
  static async createWallet(userId: string, data: any) {
    const { wallet_name, amount } = data;

    if (!wallet_name || amount === undefined) {
      throw new AppError("Wallet name and amount are required", 400);
    }

    if (amount < 0) {
      throw new AppError("Amount cannot be negative", 400);
    }

    const wallet = await Wallet.create({
      user: userId,
      wallet_name,
      amount,
    });

    return wallet;
  }

  static async getAllWallets(userId: string) {
    const wallets = await Wallet.find({ user: userId }).sort({
      createdAt: -1,
    });

    return wallets;
  }

  static async getTotalBalance(userId: string) {
    const result = await Wallet.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
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
      total_balance: result[0]?.total_balance || 0,
    };
  }

  static async updateWallet(userId: string, walletId: string, data: any) {
    const wallet = await Wallet.findOneAndUpdate(
      {
        _id: walletId,
        user: userId,
      },
      data,
      { new: true },
    );

    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    return wallet;
  }

  static async deleteWallet(userId: string, walletId: string) {
    const wallet = await Wallet.findOneAndDelete({
      _id: walletId,
      user: userId,
    });

    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    return wallet;
  }
}