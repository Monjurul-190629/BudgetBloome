import { Request, Response } from "express";
import { WalletService } from "./wallet.service";

interface AuthRequest extends Request {
  user?: any;
}

export class WalletController {
  static async createWallet(req: AuthRequest, res: Response) {
    try {
      const result = await WalletService.createWallet(req.user._id, req.body);

      res.status(201).json({
        message: "Wallet created successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }

  static async getAllWallets(req: AuthRequest, res: Response) {
    try {
      const result = await WalletService.getAllWallets(req.user._id);

      res.status(200).json({
        message: "Wallets fetched successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }

  static async getTotalBalance(req: AuthRequest, res: Response) {
    try {
      const result = await WalletService.getTotalBalance(req.user._id);

      res.status(200).json({
        message: "Total balance fetched successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }

  static async updateWallet(req: AuthRequest, res: Response) {
    try {
      const result = await WalletService.updateWallet(
        req.user._id,
        req.params.id as string,
        req.body,
      );

      res.status(200).json({
        message: "Wallet updated successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }

  static async deleteWallet(req: AuthRequest, res: Response) {
    try {
      await WalletService.deleteWallet(req.user._id, req.params.id as string);

      res.status(200).json({
        message: "Wallet deleted successfully",
      });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({
        message: err.message,
      });
    }
  }
}