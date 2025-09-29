import express from "express";
import { getShippingFee } from "../controllers/shippingController.js";

const router = express.Router();

router.get("/", getShippingFee);

export default router;
