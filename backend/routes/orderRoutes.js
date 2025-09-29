import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderDetail,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);      
router.get("/", protect, getUserOrders);          
router.get("/:id", protect, getOrderDetail);      
router.put("/:id/status", protect, updateOrderStatus); 
export default router;
