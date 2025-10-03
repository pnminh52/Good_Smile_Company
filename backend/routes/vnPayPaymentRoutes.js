import express from "express";
import { createPaymentUrl, verifyVnpayReturn } from "../lib/vnPayConfig.js";
import bodyParser from "body-parser"; 
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false })); // VNPay gửi x-www-form-urlencoded
app.use(bodyParser.json()); // chỉ để phòng

// Tạo link thanh toán VNPay
router.post("/create-payment", (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1000) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Lấy IP client
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

// Khi VNPay redirect về frontend
router.get("/payment-return", (req, res) => {
  try {
    const isValid = verifyVnpayReturn(req.query);
    if (!isValid) return res.status(400).json({ message: "Invalid signature" });

    if (req.query.vnp_ResponseCode === "00") {
      // TODO: update DB, mark order as paid
      res.json({ success: true, message: "Payment successful", data: req.query });
    } else {
      res.json({ success: false, message: "Payment failed", data: req.query });
    }
  } catch (err) {
    console.error("Payment return error:", err);
    res.status(500).json({ message: "VNPay return error" });
  }
});

router.post("/ipn", (req, res) => {
  try {
    const params = req.body; // Nhận params từ VNPay
    const isValid = verifyVnpayReturn(params);

    if (!isValid) {
      return res.status(200).json({ RspCode: "97", Message: "Invalid signature" });
    }

    if (params.vnp_ResponseCode === "00") {
      // TODO: cập nhật trạng thái đơn hàng
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
