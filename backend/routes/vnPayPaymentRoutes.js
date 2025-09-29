import express from "express";
import { createPaymentUrl, verifyVnpayReturn } from "../lib/vnPayConfig.js";

const router = express.Router();

// Tạo link thanh toán
router.post("/create-payment", (req, res) => {
    const { amount, orderId, orderInfo } = req.body;
    const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  
    const paymentUrl = createPaymentUrl({
      amount,
      orderId,
      orderInfo,
      ipAddr,
    });
  
    // 👉 Log params để kiểm tra
    console.log("==== VNPay Request Params ====");
    console.log({ amount, orderId, orderInfo, ipAddr, paymentUrl });
    console.log("==============================");
  
    res.json({ paymentUrl });
  });
  

// Khi VNPay redirect về frontend
router.get("/payment-return", (req, res) => {
  const isValid = verifyVnpayReturn(req.query);

  if (!isValid) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  // Xử lý kết quả thanh toán
  if (req.query.vnp_ResponseCode === "00") {
    // Thanh toán thành công
    res.json({ success: true, message: "Payment successful", data: req.query });
  } else {
    // Thanh toán thất bại
    res.json({ success: false, message: "Payment failed", data: req.query });
  }
});

// IPN từ VNPay (server to server)
router.get("/payment/ipn", (req, res) => {
  const isValid = verifyVnpayReturn(req.query);

  if (!isValid) {
    return res.status(400).json({ RspCode: "97", Message: "Invalid signature" });
  }

  if (req.query.vnp_ResponseCode === "00") {
    // TODO: update DB, mark order as paid
    return res.json({ RspCode: "00", Message: "Confirm Success" });
  } else {
    return res.json({ RspCode: "01", Message: "Payment Failed" });
  }
});

export default router;
