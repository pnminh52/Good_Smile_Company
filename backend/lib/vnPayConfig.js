import express from "express";
import { createPaymentUrl, verifyVnpayReturn } from "../lib/vnPayConfig.js";

const router = express.Router();

// Tạo link thanh toán VNPay
router.post("/create-payment", (req, res) => {
  try {
    const { amount, orderId, orderInfo } = req.body;

    // Validate
    if (!amount || amount < 1000 || !orderId) {
      return res.status(400).json({ message: "Invalid amount or orderId" });
    }

    const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

    const paymentUrl = createPaymentUrl({
      amount: Math.floor(amount), // số nguyên
      orderId,
      orderInfo,
      ipAddr,
    });

    console.log("VNPay Payment Params:", { amount, orderId, orderInfo, ipAddr, paymentUrl });

    res.json({ paymentUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot create payment URL" });
  }
});

// Khi VNPay redirect về frontend
router.get("/payment-return", (req, res) => {
  try {
    const isValid = verifyVnpayReturn(req.query);
    if (!isValid) return res.status(400).json({ message: "Invalid signature" });

    if (req.query.vnp_ResponseCode === "00") {
      res.json({ success: true, message: "Payment successful", data: req.query });
    } else {
      res.json({ success: false, message: "Payment failed", data: req.query });
    }
  } catch (err) {
    res.status(500).json({ message: "VNPay return error" });
  }
});

// IPN (server to server)
router.post("/payment/ipn", (req, res) => {
  try {
    const isValid = verifyVnpayReturn(req.body);
    if (!isValid) return res.status(400).json({ RspCode: "97", Message: "Invalid signature" });

    if (req.body.vnp_ResponseCode === "00") {
      // TODO: update DB, mark order as paid
      return res.json({ RspCode: "00", Message: "Confirm Success" });
    } else {
      return res.json({ RspCode: "01", Message: "Payment Failed" });
    }
  } catch (err) {
    res.status(500).json({ RspCode: "99", Message: "Server error" });
  }
});

export default router;
