import qs from "qs";
import crypto from "crypto";

export const vnp_TmnCode = process.env.VNP_TMNCODE;
export const vnp_HashSecret = process.env.VNP_HASH_SECRET;
export const vnp_Url = process.env.VNP_URL || "https://pay.vnpay.vn/vpcpay.html";
export const vnp_ReturnUrl = process.env.VNP_RETURNURL || "https://good-smile-company.vercel.app/payment-return";
export const vnp_IpnUrlEnv = process.env.VNP_IPNURL || "https://good-smile-company-1.onrender.com/api/payment/ipn";

export function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

function formatDateVN(date = new Date()) {
  const yyyy = date.getFullYear().toString();
  const MM = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const HH = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");
  return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
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
    vnp_IpnUrl: vnp_IpnUrlEnv.trim(),
    vnp_IpAddr: ipAddr.split(",")[0].trim(),
    vnp_CreateDate: formatDateVN(),
  };

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  return `${vnp_Url}?${qs.stringify(vnp_Params, { encode: false })}`;
}

export function verifyVnpayReturn(queryParams) {
  let vnp_Params = { ...queryParams };
  const secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  vnp_Params = sortObject(vnp_Params);
  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  return secureHash === signed;
}
