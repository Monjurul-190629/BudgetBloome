import { Request, Response } from "express";
import { TargetedExpenseService } from "./targetExpense.service";

interface AuthRequest extends Request {
  user?: any;
}

export class TargetedExpenseController {
  static async createTargetedExpense(req: AuthRequest, res: Response) {
    const result = await TargetedExpenseService.createTargetedExpense(
      req.user._id,
      req.body,
    );

    res.status(201).json({
      message: "Targeted expense created successfully",
      data: result,
    });
  }

  static async getTargetedExpenses(req: AuthRequest, res: Response) {
    const result = await TargetedExpenseService.getTargetedExpenses(
      req.user._id,
    );

    res.status(200).json({
      message: "Targeted expenses retrieved successfully",
      data: result.targets,
      thisMonthExpense: result.thisMonthExpense,
    });
  }

  static async updateTargetedExpense(req: AuthRequest, res: Response) {
    const result = await TargetedExpenseService.updateTargetedExpense(
      req.user._id,
      req.params.id as string,
      req.body,
    );

    res.status(200).json({
      message: "Targeted expense updated successfully",
      data: result,
    });
  }

  static async deleteTargetedExpense(req: AuthRequest, res: Response) {
    await TargetedExpenseService.deleteTargetedExpense(
      req.user._id,
      req.params.id as string,
    );

    res.status(200).json({
      message: "Targeted expense deleted successfully",
    });
  }
}