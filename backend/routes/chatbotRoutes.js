import express from "express";
import { chatWithBot } from "../controllers/chatbotController.js";

const router = express.Router();

// Chỉ POST, không GET
router.post("/", chatWithBot);

export default router;
