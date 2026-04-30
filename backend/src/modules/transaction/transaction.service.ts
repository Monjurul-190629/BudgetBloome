import mongoose from "mongoose";
import Transaction from "../../models/transaction.model";
import Wallet from "../../models/wallet.model";
import { AppError } from "../../utils/ApiError";

export class TransactionService {
  static async createTransaction(userId: string, data: any) {
    const { wallet, category_name, description, amount, created_date } = data;

    if (!wallet || !category_name || !amount) {
      throw new AppError("Wallet, category name and amount are required", 400);
    }

    if (amount <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }

    const selectedWallet = await Wallet.findOne({
      _id: wallet,
      user: userId,
    });

    if (!selectedWallet) {
      throw new AppError("Wallet not found", 404);
    }

    if (selectedWallet.amount < amount) {
      throw new AppError("Insufficient wallet balance", 400);
    }

    const transaction = await Transaction.create({
      user: userId,
      wallet,
      category_name,
      description,
      amount,
      created_date: created_date || new Date(),
    });

    selectedWallet.amount -= amount;
    await selectedWallet.save();

    return transaction;
  }

  static async getTransactionHistory(userId: string, query: any) {
  const page = Number(query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const transactions = await Transaction.find({
    user: userId,
  })
    .populate("wallet", "wallet_name amount")
    .sort({ created_date: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments({
    user: userId,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: transactions,
  };
}

  static async getTotalExpense(userId: string) {
    const result = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          total_expense: { $sum: "$amount" },
        },
      },
    ]);

    return {
      total_expense: result[0]?.total_expense || 0,
    };
  }

  static async deleteTransaction(userId: string, transactionId: string) {
    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: userId,
    });

    if (!transaction) {
      throw new AppError("Transaction not found", 404);
    }

    await Wallet.findOneAndUpdate(
      {
        _id: transaction.wallet,
        user: userId,
      },
      {
        $inc: {
          amount: transaction.amount,
        },
      },
    );

    await Transaction.findByIdAndDelete(transactionId);

    return transaction;
  }
}