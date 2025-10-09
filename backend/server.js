import express from "express";
import http from "http";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { onlineUsers, setupSocket } from "./socket.js";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import newRoutes from "./routes/newRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import vnPayRoutes from "./routes/vnPayRoutes.js";
import accountRoutes from "./routes/accountRoutes.js"

import { sql } from "./config/db.js";
import { aj } from "./lib/arcjetConfig.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://good-smile-company.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/api/payment/ipn", express.urlencoded({ extended: false }));

// ✅ HTTP + Socket
const server = http.createServer(app);
export const io = setupSocket(server);
export { onlineUsers };

// Arcjet middleware
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot) {
        return res.status(403).json({ error: "Bot access denied" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Routes
app.use("/api/payment", vnPayRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/news", newRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/account", accountRoutes)


// ✅ Khởi động server
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
