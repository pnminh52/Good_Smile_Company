import express from "express";
import {
  requestDeleteAccount,
  getDeleteRequests,
  confirmDeleteAccount,
} from "../controllers/accountController.js";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/request-delete", protect, requestDeleteAccount);
router.get("/delete-requests", protect, verifyAdmin, getDeleteRequests);
router.post("/confirm-delete", protect, verifyAdmin, confirmDeleteAccount);

export default router;
