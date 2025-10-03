import crypto from "crypto";

export const vnp_TmnCode = process.env.VNP_TMNCODE?.trim() || "";
export const vnp_HashSecret = process.env.VNP_HASH_SECRET?.trim() || "";
export const vnp_Url = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
export const vnp_ReturnUrl = process.env.VNP_RETURNURL || "https://good-smile-company.vercel.app/payment-return";
export const vnp_IpnUrl = process.env.VNP_IPNURL || "https://good-smile-company-1.onrender.com/api/payment/ipn";

// Format date YYYYMMDDHHmmss
function formatDateVN(date = new Date()) {
  const pad = n => (n < 10 ? "0" + n : n);
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

function sortObject(obj) {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    sorted[key] = obj[key]; // giữ nguyên giá trị gốc
  });
  return sorted;
}

/**
 * Tạo URL thanh toán VNPay
 */
export function createPaymentUrl({ amount, orderId, orderInfo, ipAddr, bankCode, expireDate }) {
  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode,
    vnp_Amount: Math.round(amount * 100), // VNPay nhân thêm 100
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo, // giữ nguyên để hash
    vnp_OrderType: "other",
    vnp_ReturnUrl,
    vnp_IpnUrl,
    vnp_CreateDate: formatDateVN(),
    vnp_CurrCode: "VND",
    vnp_Locale: "vn",
    vnp_IpAddr: ipAddr,
  };

  if (bankCode) vnp_Params.vnp_BankCode = bankCode;
  if (expireDate) vnp_Params.vnp_ExpireDate = formatDateVN(expireDate);

  const sortedParams = sortObject(vnp_Params);

  // Hash dùng giá trị chưa encode
  const signData = Object.keys(sortedParams)
    .map(k => `${k}=${sortedParams[k]}`)
    .join('&');

  const signed = crypto.createHmac("sha512", vnp_HashSecret)
                       .update(signData, "utf-8")
                       .digest("hex");

  sortedParams["vnp_SecureHash"] = signed;

const queryString = Object.keys(sortedParams)
  .map(k => `${k}=${encodeURIComponent(sortedParams[k]).replace(/%20/g, "+")}`)
  .join('&');


  return `${vnp_Url}?${queryString}`;
}
function decodeVnpParams(params) {
  const newParams = {};
  Object.keys(params).forEach(key => {
    newParams[key] = decodeURIComponent(params[key]);
  });
  return newParams;
}

export function verifyVnpayReturn(params) {
  const vnp_Params = { ...params };
  const secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  // decode mọi value từ VNPay trước khi hash
  Object.keys(vnp_Params).forEach(k => {
    vnp_Params[k] = decodeURIComponent(vnp_Params[k]);
  });

  const sortedParams = sortObject(vnp_Params);
  const signData = Object.keys(sortedParams)
    .map(k => `${k}=${sortedParams[k]}`)
    .join('&');

  const signed = crypto.createHmac("sha512", vnp_HashSecret)
                       .update(signData, "utf-8")
                       .digest("hex");

  return secureHash?.toLowerCase() === signed.toLowerCase();
}

