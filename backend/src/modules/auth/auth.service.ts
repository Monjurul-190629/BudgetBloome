import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../../models/user.model"
import { generateToken } from "../../utils/generateToken";

export class AuthService {
  // REGISTER
  static async register(data: any) {
    const { name, email, password, image, address, phone } = data;

    const exists = await User.findOne({ email });
    if (exists) throw new Error("User already exists");

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
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = generateToken(user._id.toString());

    return { user, token };
  }

  // FORGOT PASSWORD
  static async forgotPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await user.save();

    // In real app: send email here
    return { resetToken };
  }

  // RESET PASSWORD
  static async resetPassword(token: string, password: string) {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) throw new Error("Invalid or expired token");

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    return true;
  }
}