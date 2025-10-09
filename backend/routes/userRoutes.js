import express from "express";
import { registerUser, loginUser, getProfile, changePassword, forgotPassword, resetPassword, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", protect, getProfile);
router.put("/update-profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;
