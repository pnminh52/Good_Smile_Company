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

// Tạo URL thanh toán VNPay
export const createPaymentUrl = async (req, res) => {
  try {
    const { orderId, amount, orderInfo, bankCode } = req.body;
console.log("Received from frontend:", req.body);

    if (!orderId || !amount) {
      return res.status(400).json({ message: 'orderId and amount are required' });
    }

    const paymentData = {
      amount: amount * 100, // VNPay yêu cầu đơn vị là đồng x100
      orderId,
      orderInfo: orderInfo || `Thanh toán đơn hàng #${orderId}`,
      returnUrl: process.env.VNP_RETURNURL,
      ipnUrl: process.env.VNP_IPNURL,
      bankCode, // optional
      locale: 'vn',
      currCode: 'VND',
    };

    const paymentUrl = vnpay.paymentUrl(paymentData); // ⚡ Sử dụng phương thức đúng của version mới

    return res.json({ paymentUrl });
  } catch (err) {
    console.error('VNPay createPaymentUrl error:', err);
    return res.status(500).json({ message: 'Failed to create VNPay payment URL' });
  }
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
