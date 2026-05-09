"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const ApiError_1 = require("../../utils/ApiError");
const generateToken_1 = require("../../utils/generateToken");
class AuthService {
    // REGISTER
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                throw new ApiError_1.AppError("Request body is missing", 400);
            const { name, email, password, image, address, phone } = data;
            if (!name || !email || !password) {
                throw new ApiError_1.AppError("Name, email and password are required", 400);
            }
            const exists = yield user_model_1.default.findOne({ email });
            if (exists) {
                throw new ApiError_1.AppError("User already exists", 409);
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield user_model_1.default.create({
                name,
                email,
                password: hashedPassword,
                image,
                address,
                phone,
            });
            const token = (0, generateToken_1.generateToken)(user._id.toString());
            return { user, token };
        });
    }
    // LOGIN
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                throw new ApiError_1.AppError("Request body is missing", 400);
            const { email, password } = data;
            if (!email || !password) {
                throw new ApiError_1.AppError("Email and password are required", 400);
            }
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw new ApiError_1.AppError("Invalid credentials", 401);
            }
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match) {
                throw new ApiError_1.AppError("Invalid credentials", 401);
            }
            const token = (0, generateToken_1.generateToken)(user._id.toString());
            return { user, token };
        });
    }
    // FORGOT PASSWORD
    static forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email)
                throw new ApiError_1.AppError("Email is required", 400);
            const user = yield user_model_1.default.findOne({ email });
            if (!user)
                throw new ApiError_1.AppError("User not found", 404);
            const resetToken = crypto_1.default.randomBytes(32).toString("hex");
            user.resetToken = resetToken;
            user.resetTokenExpire = new Date(Date.now() + 10 * 60 * 1000);
            yield user.save();
            return { resetToken };
        });
    }
    // RESET PASSWORD
    static resetPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token || !password) {
                throw new ApiError_1.AppError("Token and password are required", 400);
            }
            const user = yield user_model_1.default.findOne({
                resetToken: token,
                resetTokenExpire: { $gt: Date.now() },
            });
            if (!user) {
                throw new ApiError_1.AppError("Invalid or expired token", 400);
            }
            user.password = yield bcrypt_1.default.hash(password, 10);
            user.resetToken = undefined;
            user.resetTokenExpire = undefined;
            yield user.save();
            return true;
        });
    }
}
exports.AuthService = AuthService;
