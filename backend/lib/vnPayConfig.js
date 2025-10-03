import crypto from "crypto";
import qs from "qs";

export const vnp_TmnCode = process.env.VNP_TMNCODE ; 
export const vnp_HashSecret = (process.env.VNP_HASHSECRET).trim();
export const vnp_Url = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
export const vnp_ReturnUrl = process.env.VNP_RETURNURL || "https://good-smile-company.vercel.app/payment-return";

// Hàm sắp xếp object theo thứ tự alphabet key (VNPay yêu cầu)
export function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}

// Tạo URL thanh toán
export function createPaymentUrl({ amount, orderId, orderInfo, ipAddr }) {
  const createDate = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: vnp_TmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100, // VNPay tính theo đơn vị = VND * 100
    vnp_ReturnUrl: vnp_ReturnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

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
  const signed = crypto.createHmac("sha512", vnp_HashSecret).update(Buffer.from(signData, "utf-8")).digest("hex");

  console.log("👉 SecureHash from VNPay:", secureHash);
  console.log("👉 Signed from server  :", signed);

  return secureHash === signed;
}
