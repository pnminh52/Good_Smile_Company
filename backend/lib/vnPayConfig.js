import crypto from "crypto";
import qs from "qs";

export const vnp_TmnCode = process.env.VNP_TMNCODE?.trim() || "";
export const vnp_HashSecret = process.env.VNP_HASH_SECRET?.trim() || "";
export const vnp_Url =
  process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
export const vnp_ReturnUrl =
  process.env.VNP_RETURNURL ||
  "https://good-smile-company.vercel.app/payment-return";
export const vnp_IpnUrl =
  process.env.VNP_IPNURL ||
  "https://good-smile-company-1.onrender.com/api/payment/ipn";

// Format ngày giờ yyyyMMddHHmmss
function formatDateVN(date = new Date()) {
  const pad = (n) => (n < 10 ? "0" + n : n);
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

// Sắp xếp object theo key alphabet
function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((res, key) => {
      res[key] = obj[key];
      return res;
    }, {});
}

// Tạo URL thanh toán VNPay
export function createPaymentUrl({ amount, orderId, orderInfo, ipAddr }) {
  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode,
    vnp_Amount: Math.round(amount * 100), // nhân 100
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo, // giữ nguyên để tạo chữ ký
    vnp_OrderType: "other",
    vnp_ReturnUrl,
    vnp_IpnUrl,
    vnp_IpAddr: ipAddr,
    vnp_Locale: "vn",
    vnp_CreateDate: formatDateVN(),
  };

  // 1. Sort params trước khi tạo chữ ký
  const sortedParams = sortObject(vnp_Params);

  // 2. Tạo chữ ký SHA512
  const signData = qs.stringify(sortedParams, { encode: false });
  const signed = crypto.createHmac("sha512", vnp_HashSecret)
                       .update(Buffer.from(signData, "utf-8"))
                       .digest("hex");
  sortedParams["vnp_SecureHash"] = signed;

  // 3. Trả URL encode đầy đủ cho VNPay
  return `${vnp_Url}?${qs.stringify(sortedParams, { encode: true })}`;
}
