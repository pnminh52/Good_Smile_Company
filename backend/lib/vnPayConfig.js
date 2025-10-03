import crypto from "crypto";
import qs from "qs";

export const vnp_TmnCode = process.env.VNP_TMNCODE?.trim() || "";
export const vnp_HashSecret = process.env.VNP_HASH_SECRET?.trim() || "";
export const vnp_Url = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
export const vnp_ReturnUrl = process.env.VNP_RETURNURL || "https://good-smile-company.vercel.app/payment-return";
export const vnp_IpnUrlEnv = process.env.VNP_IPNURL || "https://good-smile-company-1.onrender.com/api/payment/ipn";

// Hàm format ngày theo VNPay yêu cầu
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

// Hàm sắp xếp object theo thứ tự alphabet key (VNPay yêu cầu)
export function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}

export function createPaymentUrl({ amount, orderId, orderInfo, ipAddr }) {
  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "other",
    vnp_Amount: Math.round(amount * 100),
    vnp_ReturnUrl,
    vnp_IpnUrl: vnp_IpnUrlEnv,
    vnp_IpAddr: ipAddr.split(",")[0].trim(),
    vnp_CreateDate: formatDateVN(),
  };

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret.trim());
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  console.log("=== VNPay Debug ===");
  console.log("SignData:", signData);
  console.log("HashSecret:", `"${vnp_HashSecret}"`);
  console.log("Generated Hash:", signed);

  vnp_Params["vnp_SecureHash"] = signed;

  return `${vnp_Url}?${qs.stringify(vnp_Params, { encode: false })}`;
}


// Verify return từ VNPay (return URL / ipn)
export function verifyVnpayReturn(params) {
  const vnp_Params = { ...params };
  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });
  const signed = crypto
  .createHmac("sha512", vnp_HashSecret.trim())
  .update(Buffer.from(signData, "utf-8"))
  .digest("hex");

  console.log("👉 SecureHash from VNPay:", secureHash);
  console.log("👉 Signed from server  :", signed);

return secureHash?.toLowerCase() === signed.toLowerCase();
}
