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
exports.UserController = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
class UserController {
    /**
     * GET LOGGED IN USER PROFILE
     */
    static getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: "User profile fetched successfully",
                    data: req.user,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: err.message,
                });
            }
        });
    }
    /**
     * UPDATE USER PROFILE
     */
    static updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, {
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    image: req.body.image,
                }, { new: true }).select("-password");
                res.status(200).json({
                    message: "Profile updated successfully",
                    data: updatedUser,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: err.message,
                });
            }
        });
    }
    /**
     * DELETE ACCOUNT
     */
    static deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                yield user_model_1.default.findByIdAndDelete(userId);
                res.status(200).json({
                    message: "Account deleted successfully",
                });
            }
            catch (err) {
                res.status(500).json({
                    message: err.message,
                });
            }
        });
    }
}
exports.UserController = UserController;
