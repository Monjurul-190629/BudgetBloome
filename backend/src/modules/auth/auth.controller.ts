import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
  try {
    const result = await AuthService.register(req.body);

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
    });
  }
}

  static async login(req: Request, res: Response) {
  try {
    const result = await AuthService.login(req.body);

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      message: err.message,
    });
  }
}

  static async forgotPassword(req: Request, res: Response) {
  try {
    const result = await AuthService.forgotPassword(req.body.email);

    res.status(200).json({
      message: "Reset token generated",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
    });
  }
}

  static async resetPassword(req: Request, res: Response) {
  try {
    const { token, password } = req.body;

    await AuthService.resetPassword(token, password);

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
    });
  }
}
}