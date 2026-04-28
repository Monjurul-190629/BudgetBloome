import { Request, Response } from "express";
import User from "../../models/user.model";

interface AuthRequest extends Request {
  user?: any;
}

export class UserController {
  /**
   * GET LOGGED IN USER PROFILE
   */
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      res.status(200).json({
        message: "User profile fetched successfully",
        data: req.user,
      });
    } catch (err: any) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  /**
   * UPDATE USER PROFILE
   */
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user._id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          image: req.body.image,
        },
        { new: true }
      ).select("-password");

      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (err: any) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  /**
   * DELETE ACCOUNT
   */
  static async deleteAccount(req: AuthRequest, res: Response) {
    try {
      const userId = req.user._id;

      await User.findByIdAndDelete(userId);

      res.status(200).json({
        message: "Account deleted successfully",
      });
    } catch (err: any) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}