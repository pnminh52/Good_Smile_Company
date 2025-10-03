import qs from "qs";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const vnp_TmnCode = process.env.VNP_TMNCODE;
export const vnp_HashSecret = process.env.VNP_HASH_SECRET;
export const vnp_Url = process.env.VNP_URL;
export const vnp_ReturnUrl = process.env.VNP_RETURNURL;
export const vnp_IpnUrl = process.env.VNP_IPNURL;

// Hàm sort object theo key (VNPay yêu cầu)
export function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}

// Tạo URL thanh toán
export function createPaymentUrl({ amount, orderId, orderInfo, ipAddr }) {
  const date = new Date();
  const createDate = date.toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: vnp_TmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100, // nhân 100
    vnp_ReturnUrl: vnp_ReturnUrl,
    vnp_IpnUrl: vnp_IpnUrl,
    vnp_CreateDate: createDate,
    vnp_IpAddr: ipAddr,
  };

  // Sort params
  vnp_Params = sortObject(vnp_Params);

  // Tạo chuỗi query
  const signData = qs.stringify(vnp_Params, { encode: false });

  // Hash SHA512
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;

  return `${vnp_Url}?${qs.stringify(vnp_Params, { encode: true })}`;
}

// Xác thực chữ ký khi VNPay redirect / gọi IPN
export function verifyVnpayReturn(query) {
  const vnp_Params = { ...query };
  const secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });

  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  return secureHash === signed;
}
