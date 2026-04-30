import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";

interface AuthRequest extends Request {
  user?: any;
}

export class TransactionController {
  static async createTransaction(req: AuthRequest, res: Response) {
    try {
      const result = await TransactionService.createTransaction(
        req.user._id,
        req.body,
      );

      res.status(201).json({
        message: "Transaction created successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }

  static async getTransactionHistory(req: AuthRequest, res: Response) {
    try {
      const result = await TransactionService.getTransactionHistory(
        req.user._id,
        req.query,
      );

      res.status(200).json({
        message: "Transaction history fetched successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }

  static async getTotalExpense(req: AuthRequest, res: Response) {
    try {
      const result = await TransactionService.getTotalExpense(req.user._id);

      res.status(200).json({
        message: "Total expense fetched successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }

  static async deleteTransaction(req: AuthRequest, res: Response) {
    try {
      await TransactionService.deleteTransaction(req.user._id, req.params.id as string);

      res.status(200).json({
        message: "Transaction deleted successfully",
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }
}