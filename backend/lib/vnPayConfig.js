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

// Hàm format ngày giờ theo VNPay yêu cầu (yyyyMMddHHmmss)
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

// Sắp xếp object theo thứ tự alphabet key
export function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((res, key) => {
      res[key] = obj[key];
      return res;
    }, {});
}

// Tạo URL thanh toán
export function createPaymentUrl({ amount, orderId, orderInfo, ipAddr }) {
  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode,
    vnp_Amount: Math.round(amount * 100), // VNPay yêu cầu *100
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: encodeURIComponent(orderInfo),
    vnp_OrderType: "other",
    vnp_ReturnUrl,
    vnp_IpnUrl,
    vnp_IpAddr: ipAddr,
    vnp_Locale: "vn",
    vnp_CreateDate: formatDateVN(),
  };

  // Sắp xếp tham số
  vnp_Params = sortObject(vnp_Params);

  // Tạo chữ ký
  const signData = qs.stringify(vnp_Params, { encode: false });
  const signed = crypto
    .createHmac("sha512", vnp_HashSecret)
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;

  // Trả về link thanh toán
  return `${vnp_Url}?${qs.stringify(vnp_Params, { encode: false })}`;
}

// Verify return từ VNPay (return URL hoặc IPN)
export function verifyVnpayReturn(params) {
  const vnp_Params = { ...params };
  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });
  const signed = crypto
    .createHmac("sha512", vnp_HashSecret)
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");

  return secureHash?.toLowerCase() === signed.toLowerCase();
}
