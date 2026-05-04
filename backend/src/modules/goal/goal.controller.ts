import { Request, Response } from "express";
import { GoalService } from "./goal.service";

interface AuthRequest extends Request {
  user?: any;
}

export class GoalController {
  static async createGoal(req: AuthRequest, res: Response) {
    const result = await GoalService.createGoal(req.user._id, req.body);

    res.status(201).json({
      message: "Goal created successfully",
      data: result,
    });
  }

  static async getGoals(req: AuthRequest, res: Response) {
    const result = await GoalService.getGoals(req.user._id);

    res.status(200).json({
      message: "Goals retrieved successfully",
      data: result.goals,
      numberOfFilled: result.numberOfFilled,
    });
  }

  static async updateGoal(req: AuthRequest, res: Response) {
    const result = await GoalService.updateGoal(
      req.user._id,
      req.params.id as string,
      req.body,
    );

    res.status(200).json({
      message: "Goal updated successfully",
      data: result,
    });
  }

  static async deleteGoal(req: AuthRequest, res: Response) {
    await GoalService.deleteGoal(req.user._id, req.params.id as string);

    res.status(200).json({
      message: "Goal deleted successfully",
    });
  }
}