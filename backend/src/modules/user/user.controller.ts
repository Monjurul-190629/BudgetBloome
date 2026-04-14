import { Request, Response } from "express";
import User from "../../models/user.model";

// extend request type (because we attach req.user in middleware)
interface AuthRequest extends Request {
  user?: any;
}

export class UserController {
  /**
   * GET LOGGED IN USER PROFILE
   */
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: req.user,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
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

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
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

      return res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}