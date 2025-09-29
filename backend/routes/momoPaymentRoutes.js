import express from "express";
import { createMoMoPayment } from "../lib/momoConfig.js";

const router = express.Router();

// Tạo link thanh toán MoMo
router.post("/momo/create-payment", async (req, res) => {
  try {
    const { amount, orderId, orderInfo } = req.body;
    const result = await createMoMoPayment({ amount, orderId, orderInfo });
    res.json(result);
  } catch (error) {
    console.error("MoMo payment error:", error);
    res.status(500).json({ message: "MoMo payment error" });
  }
});

// MoMo redirect về frontend
router.get("/momo-return", (req, res) => {
  console.log("MoMo return:", req.query);
  if (req.query.resultCode === "0") {
    res.json({ success: true, message: "Payment successful", data: req.query });
  } else {
    res.json({ success: false, message: "Payment failed", data: req.query });
  }
});

// MoMo gọi server to server (IPN)
router.post("/momo-ipn", (req, res) => {
  console.log("MoMo IPN:", req.body);
  if (req.body.resultCode === 0) {
    // TODO: update DB đơn hàng thành "đã thanh toán"
    res.json({ message: "IPN received", data: req.body });
  } else {
    res.json({ message: "Payment failed", data: req.body });
  }
});

export default router;
