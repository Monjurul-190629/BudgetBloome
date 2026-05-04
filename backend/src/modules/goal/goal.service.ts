import Goal from "../../models/goal.model";
import { AppError } from "../../utils/ApiError";

export class GoalService {
  static async createGoal(userId: string, data: any) {
  const { name, amount, description } = data;

  if (!name || !amount) {
    throw new AppError("Name and amount are required", 400);
  }

  if (amount <= 0) {
    throw new AppError("Amount must be greater than 0", 400);
  }

  return await Goal.create({
    user: userId,
    name,
    amount,
    description: description || "",
    filled: false,
  });
}

  static async getGoals(userId: string) {
    const goals = await Goal.find({ user: userId }).sort({ createdAt: -1 });

    const numberOfFilled = await Goal.countDocuments({
      user: userId,
      filled: true,
    });

    return {
      numberOfFilled,
      data: goals,
    };
  }

  static async updateGoal(userId: string, goalId: string, data: any) {
  const { name, amount, filled, description } = data;

  const updateData: any = {};

  if (name !== undefined) updateData.name = name;

  if (amount !== undefined) {
    if (amount <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }
    updateData.amount = amount;
  }

  if (filled !== undefined) updateData.filled = filled;

  if (description !== undefined) {
    updateData.description = description;
  }

  const goal = await Goal.findOneAndUpdate(
    { _id: goalId, user: userId },
    updateData,
    { new: true, runValidators: true },
  );

  if (!goal) {
    throw new AppError("Goal not found", 404);
  }
  return goal;
}

  static async deleteGoal(userId: string, goalId: string) {
    const goal = await Goal.findOneAndDelete({
      _id: goalId,
      user: userId,
    });

    if (!goal) {
      throw new AppError("Goal not found", 404);
    }

    return goal;
  }
}