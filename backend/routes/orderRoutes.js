import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderDetail,
  updateOrderStatus,
  getAllOrders
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);      
router.get("/", protect, getUserOrders);
router.get("/all", protect, getAllOrders);           
router.get("/:id", protect, getOrderDetail);      
router.put("/:id/status", protect, updateOrderStatus); 
export default router;
