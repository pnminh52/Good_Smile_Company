// backend/routes/paymentRoutes.js
import express from "express";
import { VNPay } from "vnpay/vnpay";

const router = express.Router();

// --- Khởi tạo VNPay object ---
const vnpay = new VNPay({
  tmnCode: process.env.VNP_TMNCODE,
  secureSecret: process.env.VNP_HASH_SECRET,
  vnpayHost: process.env.VNP_HOST || "https://sandbox.vnpayment.vn",
  testMode: process.env.VNP_TEST === "true",
  hashAlgorithm: "SHA512",
});

// --- Tạo link thanh toán VNPay ---
router.post("/create-payment", async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId || amount < 1000) {
      return res.status(400).json({ message: "Invalid params" });
    }

    const ipAddr =
      (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1")
        .split(",")[0]
        .trim();

    const orderInfo = `Payment for order ${orderId}`;

    // Tạo link thanh toán
    const paymentUrl = vnpay.buildPaymentUrl({
      amount: Math.floor(amount * 100), // VNPay nhận số nguyên *100
      orderId,
      orderInfo,
      ipAddr,
      locale: "vn",
      returnUrl: `${process.env.FRONTEND_URL}/payment-return`,
    });

    console.log("VNPay Payment Params:", { amount, orderId, orderInfo, ipAddr, paymentUrl });
    res.json({ paymentUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot create payment URL" });
  }
});

// --- Redirect về frontend sau khi thanh toán ---
router.get("/payment-return", async (req, res) => {
  try {
    const query = req.query;
    const isValid = vnpay.verifyReturnUrl(query);

    if (!isValid) return res.status(400).json({ message: "Invalid signature" });

    if (query.vnp_ResponseCode === "00") {
      // TODO: update order status = paid
      res.json({ success: true, message: "Payment successful", data: query });
    } else {
      res.json({ success: false, message: "Payment failed", data: query });
    }
  } catch (err) {
    console.error("Payment return error:", err);
    res.status(500).json({ message: "VNPay return error" });
  }
});

// --- IPN callback từ VNPay ---
router.post("/ipn", express.urlencoded({ extended: false }), express.json(), async (req, res) => {
  try {
    const query = req.body;
    const isValid = vnpay.verifyReturnUrl(query);

    if (!isValid) {
      return res.status(200).json({ RspCode: "97", Message: "Invalid signature" });
    }

    if (query.vnp_ResponseCode === "00") {
      // TODO: update order status = paid
      return res.status(200).json({ RspCode: "00", Message: "Confirm Success" });
    } else {
      return res.status(200).json({ RspCode: "01", Message: "Payment Failed" });
    }
  } catch (err) {
    console.error("IPN error:", err);
    return res.status(200).json({ RspCode: "99", Message: "Server error" });
  }
});

export default router;
