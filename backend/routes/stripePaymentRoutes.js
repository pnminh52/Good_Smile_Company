import express from "express";
import stripe from "../lib/stripeConfig.js";

const router = express.Router();

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe tính theo cents
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
