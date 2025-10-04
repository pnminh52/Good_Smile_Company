import 'dotenv/config';
import { VNPay, ignoreLogger } from 'vnpay';

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

export const createPaymentUrl = async (req, res) => {
  const { orderId, amount } = req.body;
  if (!orderId || !amount) return res.status(400).json({ message: "Missing orderId or amount" });

  const paymentData = {
    orderId,
    amount: amount * 100,
    orderInfo: `Payment for order ${orderId}`,
    returnUrl: process.env.VNP_RETURNURL,
    ipnUrl: process.env.VNP_IPNURL,
    locale: "vn",
    currCode: "VND",
  };

     const paymentUrl = vnpay.createPaymentUrl(paymentData);
  console.log("VNPay Payment Params:", paymentData);
  res.json({ paymentUrl });
};

// Verify trả về khi VNPay redirect (nếu cần)
export const verifyReturnUrl = async (req, res) => {
  try {
    const queryParams = req.query; // query string VNPay trả về
    const result = vnpay.verifyReturnUrl(queryParams); // verify hash, trạng thái giao dịch

    return res.json({ result });
  } catch (err) {
    console.error('VNPay verifyReturnUrl error:', err);
    return res.status(500).json({ message: 'Failed to verify VNPay return' });
  }
};
