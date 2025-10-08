import express from "express";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";
import {
  requestDeleteAccount,
  getDeleteRequests,
  confirmDeleteAccount,
  cancelDeleteAccount, 
} from "../controllers/accountController.js";

const router = express.Router();

router.post("/request-delete", protect, requestDeleteAccount);
router.get("/delete-requests", protect, verifyAdmin, getDeleteRequests);
router.post("/confirm-delete", protect, verifyAdmin, confirmDeleteAccount);
router.post("/cancel-delete", protect, cancelDeleteAccount); 

export default router;
