import express from 'express';
import { createPaymentUrl, verifyReturnUrl, getBankList } from '../controllers/vnPayController.js';

const router = express.Router();

// Tạo URL thanh toán VNPay
router.post('/create-payment', createPaymentUrl);

// VNPay redirect về sau khi thanh toán xong
router.get('/payment-return', verifyReturnUrl);

// Lấy danh sách ngân hàng VNPay (nếu cần)
router.get('/banks', getBankList);

// routes/vnPayRoutes.js
router.get('/ipn', verifyReturnUrl);

export default router;
