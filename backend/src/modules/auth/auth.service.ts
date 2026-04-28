import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../../models/user.model";
import { AppError } from "../../utils/ApiError";
import { generateToken } from "../../utils/generateToken";

export class AuthService {
  // REGISTER
  static async register(data: any) {
    if (!data) throw new AppError("Request body is missing", 400);

    const { name, email, password, image, address, phone } = data;

    if (!name || !email || !password) {
      throw new AppError("Name, email and password are required", 400);
    }

    const exists = await User.findOne({ email });
    if (exists) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
      address,
      phone,
    });

    const token = generateToken(user._id.toString());

    return { user, token };
  }

  // LOGIN
  static async login(data: any) {
    if (!data) throw new AppError("Request body is missing", 400);

    const { email, password } = data;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user._id.toString());

    return { user, token };
  }

  // FORGOT PASSWORD
  static async forgotPassword(email: string) {
    if (!email) throw new AppError("Email is required", 400);

    const user = await User.findOne({ email });
    if (!user) throw new AppError("User not found", 404);

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    return { resetToken };
  }

  // RESET PASSWORD
  static async resetPassword(token: string, password: string) {
    if (!token || !password) {
      throw new AppError("Token and password are required", 400);
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError("Invalid or expired token", 400);
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    return true;
  }
}