import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// extend Request type
interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    // 1. Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    // 3. Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // 4. Attach user to request
    req.user = user;

    next();
  } catch (error: any) {
    return res.status(401).json({
      message: "Token failed or expired",
    });
  }
};