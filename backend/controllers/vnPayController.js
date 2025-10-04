import 'dotenv/config';
import { VNPay, ignoreLogger } from 'vnpay';
import { ProductCode, VnpLocale } from 'vnpay/enums';
import { dateFormat } from 'vnpay/utils';

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

    if (!orderId || !amount) {
      return res.status(400).json({ message: "Missing orderId or amount" });
    }

    const createDate = new Date();
    const expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 15); // hết hạn sau 15 phút

    const paymentData = {
      vnp_TxnRef: orderId.toString(),
      vnp_Amount: amount * 100, // VNPay nhân với 100
      vnp_OrderInfo: `Payment for order ${orderId}`,
      vnp_OrderType: ProductCode.Other,
      vnp_Locale: VnpLocale.VN,
      vnp_ReturnUrl: process.env.VNP_RETURNURL,
      vnp_IpAddr: req.ip || '127.0.0.1',
      vnp_CreateDate: dateFormat(createDate),
      vnp_ExpireDate: dateFormat(expireDate),
    };

    const paymentUrl = vnpay.buildPaymentUrl(paymentData);

    console.log("VNPay Payment Params:", paymentData);
    res.json({ paymentUrl });
  } catch (err) {
    console.error("VNPay createPaymentUrl error:", err);
    res.status(500).json({ message: "Failed to create payment URL" });
  }
};

// Verify trả về khi VNPay redirect
export const verifyReturnUrl = async (req, res) => {
  try {
    const queryParams = req.query;
    const result = vnpay.verifyReturnUrl(queryParams);

    res.json({ result });
  } catch (err) {
    console.error('VNPay verifyReturnUrl error:', err);
    res.status(500).json({ message: 'Failed to verify VNPay return' });
  }
};

// Optional: lấy danh sách ngân hàng
export const getBankList = async (req, res) => {
  try {
    const banks = await vnpay.getBankList();
    res.json(banks);
  } catch (err) {
    console.error('VNPay getBankList error:', err);
    res.status(500).json({ message: 'Failed to fetch bank list' });
  }
};
