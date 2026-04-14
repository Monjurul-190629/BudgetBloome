import { Router } from "express";
import { UserController } from "./user.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * ALL ROUTES ARE PROTECTED
 */

// GET PROFILE
router.get("/profile", protect, UserController.getProfile);

// UPDATE PROFILE
router.put("/update", protect, UserController.updateProfile);

// DELETE ACCOUNT
router.delete("/delete", protect, UserController.deleteAccount);

export default router;