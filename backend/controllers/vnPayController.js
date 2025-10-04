import 'dotenv/config';
import { VNPay } from 'vnpay';

const vnpay = new VNPay({
  tmnCode: process.env.VNP_TMNCODE,
  secureSecret: process.env.VNP_HASH_SECRET,
  vnpayHost: 'https://sandbox.vnpayment.vn',
  testMode: true,
});

// Tạo URL thanh toán
export const createPaymentUrl = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    if (!orderId || !amount) {
      return res.status(400).json({ message: "Missing orderId or amount" });
    }

    const paymentData = {
      orderId,
      amount: amount * 100, // VNPay yêu cầu *100
      orderInfo: `Payment for order ${orderId}`,
      returnUrl: process.env.VNP_RETURNURL,
      ipnUrl: process.env.VNP_IPNURL,
      locale: 'vn',
      currCode: 'VND',
    };

    // ❌ Sai: vnpay.paymentUrl()
    // ✅ Đúng:
    const paymentUrl = vnpay.createPaymentUrl(paymentData);

    console.log("VNPay Payment Params:", paymentData);

    return res.json({ paymentUrl });
  } catch (error) {
    console.error("VNPay createPaymentUrl error:", error);
    return res.status(500).json({ message: error.message });
  }
};
