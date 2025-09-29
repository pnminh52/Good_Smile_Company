import crypto from "crypto";
import axios from "axios";

export const momo_PartnerCode = process.env.MOMO_PARTNER_CODE;
export const momo_AccessKey = process.env.MOMO_ACCESS_KEY;
export const momo_SecretKey = process.env.MOMO_SECRET_KEY;
export const momo_Endpoint =
  process.env.MOMO_ENDPOINT || "https://test-payment.momo.vn/v2/gateway/api/create";
export const momo_ReturnUrl =
  process.env.MOMO_RETURN_URL || "http://localhost:5173/payment-return";
export const momo_NotifyUrl =
  process.env.MOMO_NOTIFY_URL || "http://localhost:3000/api/payment/momo-ipn";

export async function createMoMoPayment({ amount, orderId, orderInfo }) {
  const requestId = orderId + new Date().getTime();
  const rawSignature =
    "accessKey=" + momo_AccessKey +
    "&amount=" + amount +
    "&extraData=" + "" +
    "&ipnUrl=" + momo_NotifyUrl +
    "&orderId=" + orderId +
    "&orderInfo=" + orderInfo +
    "&partnerCode=" + momo_PartnerCode +
    "&redirectUrl=" + momo_ReturnUrl +
    "&requestId=" + requestId +
    "&requestType=captureWallet";

  const signature = crypto
    .createHmac("sha256", momo_SecretKey)
    .update(rawSignature)
    .digest("hex");

  const body = {
    partnerCode: momo_PartnerCode,
    accessKey: momo_AccessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl: momo_ReturnUrl,
    ipnUrl: momo_NotifyUrl,
    extraData: "",
    requestType: "captureWallet",
    signature,
    lang: "vi"
  };

  const res = await axios.post(momo_Endpoint, body, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
}
