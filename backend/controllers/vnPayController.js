import 'dotenv/config';
import { VNPay, ignoreLogger } from 'vnpay';
import { ProductCode, VnpLocale } from 'vnpay/enums';
import { dateFormat } from 'vnpay/utils';
import { sql } from '../config/db.js';

// Khởi tạo VNPay instance
const vnpay = new VNPay({
  tmnCode: process.env.VNP_TMNCODE,
  secureSecret: process.env.VNP_HASH_SECRET,
  vnpayHost: 'https://sandbox.vnpayment.vn',
  testMode: true,
  enableLog: true,
  loggerFn: ignoreLogger,
  endpoints: {
    paymentEndpoint: 'paymentv2/vpcpay.html',
    queryDrRefundEndpoint: 'merchant_webapi/api/transaction',
    getBankListEndpoint: 'qrpayauth/api/merchant/get_bank_list',
  },
});

// Tạo URL thanh toán VNPay
export const createPaymentUrl = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Missing orderId" });
    }
    

    const createDate = new Date();
    const fixedAmount = 10000; 

    const paymentData = {
      vnp_TxnRef: orderId.toString(),
      vnp_Amount: fixedAmount * 100, // VNPay nhân với 100
      vnp_OrderInfo: `Payment for order ${orderId}`,
      vnp_OrderType: ProductCode.Other,
      vnp_Locale: VnpLocale.VN,
      vnp_ReturnUrl: process.env.VNP_RETURNURL,
      vnp_IpAddr: req.ip || '127.0.0.1',
      vnp_CreateDate: dateFormat(createDate),
    };

    const paymentUrl = vnpay.buildPaymentUrl(paymentData);

    // console.log("VNPay Payment Params:", paymentData);
    res.json({ paymentUrl });
  } catch (err) {
    console.error("VNPay createPaymentUrl error:", err);
    res.status(500).json({ message: "Failed to create payment URL" });
  }
};

export const verifyReturnUrl = async (req, res) => {
  try {
    const queryParams = req.query;
    const result = vnpay.verifyReturnUrl(queryParams);

    const orderId = queryParams.vnp_TxnRef;
    const responseCode = queryParams.vnp_ResponseCode;

    console.log("VNPay callback:", { orderId, responseCode });

    // 🔹 Lấy thông tin đơn hàng để biết user nào thanh toán
    const order = await sql`SELECT * FROM orders WHERE id = ${orderId}`;
    if (!order.length) {
      console.warn(`⚠️ Order ${orderId} not found`);
      return res.status(404).send("Order not found");
    }

    const userId = order[0].user_id;

    if (responseCode === "00") {
      await sql`UPDATE orders SET status_id = 2 WHERE id = ${orderId}`;
      console.log(`✅ Order ${orderId} success`);
    
      // ✅ Lấy userId từ đơn hàng
      const userId = order[0].user_id;
    
      // ✅ Xóa toàn bộ giỏ hàng của user
      await sql`DELETE FROM cart WHERE user_id = ${userId}`;
      console.log(`🧹 Cleared cart for user ${userId}`);
    
      // ✅ Redirect về trang success
      return res.redirect(`https://good-smile-company.vercel.app/order-success?orderId=${orderId}`);
    } else {
      await sql`UPDATE orders SET status_id = 4 WHERE id = ${orderId}`;
      console.log(`❌ Order ${orderId} failed`);
      return res.redirect(`https://good-smile-company.vercel.app/order-fail?orderId=${orderId}`);
    }
    
  } catch (err) {
    console.error("VNPay verifyReturnUrl error:", err);
    res.status(500).json({ message: "Failed to verify VNPay return" });
  }
};





export const getBankList = async (req, res) => {
  try {
    const banks = await vnpay.getBankList();
    res.json(banks);
  } catch (err) {
    console.error('VNPay getBankList error:', err);
    res.status(500).json({ message: 'Failed to fetch bank list' });
  }
};
