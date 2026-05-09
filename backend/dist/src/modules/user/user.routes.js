"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * ALL ROUTES ARE PROTECTED
 */
// GET PROFILE
router.get("/profile", auth_middleware_1.protect, user_controller_1.UserController.getProfile);
// UPDATE PROFILE
router.put("/update", auth_middleware_1.protect, user_controller_1.UserController.updateProfile);
// DELETE ACCOUNT
router.delete("/delete", auth_middleware_1.protect, user_controller_1.UserController.deleteAccount);
exports.default = router;
