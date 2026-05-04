import mongoose from "mongoose";
import TargetedExpense from "../../models/targetedExpense.model";
import Transaction from "../../models/transaction.model";
import { AppError } from "../../utils/ApiError";

export class TargetedExpenseService {
  private static getMonthRange() {
    const now = new Date();

    const fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    toDate.setHours(23, 59, 59, 999);

    return { fromDate, toDate };
  }

  private static async getThisMonthExpense(userId: string) {
    const { fromDate, toDate } = this.getMonthRange();

    const result = await Transaction.aggregate([
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

    return result[0]?.total_expense || 0;
  }

  static async createTargetedExpense(userId: string, data: any) {
    const { name, amount } = data;

    if (!name || !amount) {
      throw new AppError("Name and amount are required", 400);
    }

    if (amount <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }

    const thisMonthExpense = await this.getThisMonthExpense(userId);

    const result = await TargetedExpense.create({
      user: userId,
      name,
      amount,
      filled: thisMonthExpense >= amount,
    });

    return result;
  }

  static async getTargetedExpenses(userId: string) {
    const targets = await TargetedExpense.find({ user: userId }).sort({
      createdAt: -1,
    });

    const thisMonthExpense = await this.getThisMonthExpense(userId);

    const formattedTargets = targets.map((target) => ({
      ...target.toObject(),
      filled: thisMonthExpense >= target.amount, // 🔥 dynamic calculation
    }));

    return {
      targets: formattedTargets,
      thisMonthExpense,
    };
  }

  static async updateTargetedExpense(
    userId: string,
    targetId: string,
    data: any,
  ) {
    const target = await TargetedExpense.findOne({
      _id: targetId,
      user: userId,
    });

    if (!target) {
      throw new AppError("Targeted expense not found", 404);
    }

    if (data.name !== undefined) target.name = data.name;
    if (data.amount !== undefined) {
      if (data.amount <= 0) {
        throw new AppError("Amount must be greater than 0", 400);
      }
      target.amount = Number(data.amount);
    }

    const thisMonthExpense = await this.getThisMonthExpense(userId);

    target.filled = thisMonthExpense >= target.amount;

    await target.save();

    return target;
  }

  static async deleteTargetedExpense(userId: string, targetId: string) {
    const target = await TargetedExpense.findOneAndDelete({
      _id: targetId,
      user: userId,
    });

    if (!target) {
      throw new AppError("Targeted expense not found", 404);
    }

    return target;
  }
}