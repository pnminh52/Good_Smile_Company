import express from "express";
import { createPaymentUrl, verifyVnpayReturn } from "../lib/vnPayConfig.js";

const router = express.Router();

// --- Tạo link thanh toán VNPay ---
router.post("/create-payment", (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1000) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const ipAddr =
      (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1")
        .split(",")[0]
        .trim();

    const orderId = `ORDER${Date.now()}`;
    const orderInfo = `Payment for order ${orderId}`;

    const paymentUrl = createPaymentUrl({
      amount: Math.floor(amount),
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

// --- Redirect về frontend sau khi thanh toán ---
router.get("/payment-return", (req, res) => {
  try {
    const isValid = verifyVnpayReturn(req.query);

    if (!isValid) return res.status(400).json({ message: "Invalid signature" });

    const decodedParams = Object.fromEntries(
      Object.entries(req.query).map(([k, v]) => [k, decodeURIComponent(v)])
    );

    if (decodedParams.vnp_ResponseCode === "00") {
      // TODO: update DB trạng thái đơn hàng thành paid
      res.json({ success: true, message: "Payment successful", data: decodedParams });
    } else {
      res.json({ success: false, message: "Payment failed", data: decodedParams });
    }
  } catch (err) {
    console.error("Payment return error:", err);
    res.status(500).json({ message: "VNPay return error" });
  }
});

// --- IPN callback từ VNPay ---
router.post(
  "/ipn",
  express.urlencoded({ extended: false }), // parse body x-www-form-urlencoded
  express.json(),
  (req, res) => {
    try {
      const decodedParams = req.body;

      const isValid = verifyVnpayReturn(decodedParams);

      if (!isValid) {
        return res.status(200).json({ RspCode: "97", Message: "Invalid signature" });
      }

      if (decodedParams.vnp_ResponseCode === "00") {
        // TODO: update DB trạng thái đơn hàng thành paid
        return res.status(200).json({ RspCode: "00", Message: "Confirm Success" });
      } else {
        return res.status(200).json({ RspCode: "01", Message: "Payment Failed" });
      }
    } catch (err) {
      console.error("IPN error:", err);
      return res.status(200).json({ RspCode: "99", Message: "Server error" });
    }
  }
);

export default router;
