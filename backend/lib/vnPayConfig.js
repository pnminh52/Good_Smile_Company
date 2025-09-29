import qs from "qs";
import crypto from "crypto";

export const vnp_TmnCode = process.env.VNP_TMNCODE;
export const vnp_HashSecret = process.env.VNP_HASH_SECRET;
export const vnp_Url = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
export const vnp_ReturnUrl = process.env.VNP_RETURNURL || "http://localhost:5173/payment-return";
export const vnp_IpnUrl = process.env.VNP_IPNURL || "http://localhost:3000/api/payment/ipn";

export function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

export function createPaymentUrl({ amount, orderId, orderInfo, ipAddr }) {
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = vnp_TmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = "VND";
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = vnp_ReturnUrl;
  vnp_Params["vnp_IpnUrl"] = vnp_IpnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  return `${vnp_Url}?${qs.stringify(vnp_Params, { encode: false })}`;
}

/**
 * Verify callback từ VNPay
 * @param {Object} queryParams req.query từ VNPay gửi về
 * @returns {boolean} true nếu hợp lệ
 */
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
