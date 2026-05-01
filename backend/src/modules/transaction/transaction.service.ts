import mongoose from "mongoose";
import Transaction from "../../models/transaction.model";
import Wallet from "../../models/wallet.model";
import { AppError } from "../../utils/ApiError";

export class TransactionService {
  static async createTransaction(userId: string, data: any) {
    const {
      wallet,
      category_name,
      description,
      amount,
      created_date,
      type,
    } = data;

    if (!wallet || !category_name || !amount || !type) {
      throw new AppError(
        "Wallet, category name, amount and type are required",
        400
      );
    }

    if (!["income", "expense"].includes(type)) {
      throw new AppError("Invalid transaction type", 400);
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

    if (type === "expense" && selectedWallet.amount < amount) {
      throw new AppError("Insufficient wallet balance", 400);
    }

    const balanceChange = type === "income" ? amount : -amount;

    const transaction = await Transaction.create({
      user: userId,
      wallet,
      category_name,
      description,
      amount,
      type,
      created_date: created_date || new Date(),
    });

    await Wallet.findOneAndUpdate(
      {
        _id: wallet,
        user: userId,
      },
      {
        $inc: {
          amount: balanceChange,
        },
      }
    );

    return transaction;
  }

  static async getTransactionHistory(userId: string, query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const skip = (page - 1) * limit;

    let fromDate: Date;
    let toDate: Date;

    if (query.from && query.to) {
      fromDate = new Date(query.from);
      toDate = new Date(query.to);
    } else {
      const now = new Date();

      fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
      toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    toDate.setHours(23, 59, 59, 999);

    const filter: any = {
      user: userId,
      created_date: {
        $gte: fromDate,
        $lte: toDate,
      },
    };

    if (query.type && ["income", "expense"].includes(query.type)) {
      filter.type = query.type;
    }

    const transactions = await Transaction.find(filter)
      .populate("wallet", "wallet_name amount")
      .sort({ created_date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments(filter);

    const totalExpenseResult = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: "expense",
          created_date: {
            $gte: fromDate,
            $lte: toDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          total_expense: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncomeResult = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: "income",
          created_date: {
            $gte: fromDate,
            $lte: toDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          total_income: { $sum: "$amount" },
        },
      },
    ]);

    return {
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      total_expense: totalExpenseResult[0]?.total_expense || 0,
      total_income: totalIncomeResult[0]?.total_income || 0,
      data: transactions,
    };
  }

  static async getTotalExpense(userId: string) {
    const result = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: "expense",
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

    const balanceChange =
      transaction.type === "income"
        ? -transaction.amount
        : transaction.amount;

    await Wallet.findOneAndUpdate(
      {
        _id: transaction.wallet,
        user: userId,
      },
      {
        $inc: {
          amount: balanceChange,
        },
      }
    );

    await Transaction.findByIdAndDelete(transactionId);

    return transaction;
  }
}