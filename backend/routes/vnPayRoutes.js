import express from 'express';
import { createPaymentUrl, verifyReturnUrl } from '../controllers/vnPayController.js';

const router = express.Router();

router.post('/create-payment', createPaymentUrl);
router.get('/payment-return', verifyReturnUrl);

export default router;
