import mongoose from "mongoose";
import TargetedExpense from "../../models/targetedExpense.model";
import Transaction from "../../models/transaction.model";
import { AppError } from "../../utils/ApiError";

export class TargetedExpenseService {
  private static async getExpenseByDateRange(
    userId: string,
    from?: string,
    to?: string,
  ) {
    const matchQuery: any = {
      user: new mongoose.Types.ObjectId(userId),
      type: "expense",
    };

    if (from || to) {
      matchQuery.created_date = {};

      if (from) {
        matchQuery.created_date.$gte = new Date(from);
      }

      if (to) {
        const toDate = new Date(to);

        toDate.setHours(23, 59, 59, 999);

        matchQuery.created_date.$lte = toDate;
      }
    }

    const result = await Transaction.aggregate([
      {
        $match: matchQuery,
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

    const result = await TargetedExpense.create({
      user: userId,
      name,
      amount,
    });

    return result;
  }

  static async getTargetedExpenses(
    userId: string,
    from?: string,
    to?: string,
  ) {
    const targets = await TargetedExpense.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    const totalExpense = await this.getExpenseByDateRange(
      userId,
      from,
      to,
    );

    const totalTargetedExpense = targets.reduce(
      (acc, target) => acc + target.amount,
      0,
    );

    const formattedTargets = targets.map((target) => ({
      ...target.toObject(),
      filled: totalExpense >= target.amount,
    }));

    return {
      targets: formattedTargets,
      totalExpense,
      totalTargetedExpense,
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

    if (data.name !== undefined) {
      target.name = data.name;
    }

    if (data.amount !== undefined) {
      if (data.amount <= 0) {
        throw new AppError("Amount must be greater than 0", 400);
      }

      target.amount = Number(data.amount);
    }

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