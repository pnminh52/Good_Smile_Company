import express from "express";
import http from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import newRoutes from "./routes/newRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import vnPayRoutes from "./routes/vnPayRoutes.js";
import accountRoutes from "./routes/accountRoutes.js"

import { sql } from "./config/db.js";
import { aj } from "./lib/arcjetConfig.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/api/payment/ipn", express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Backend run successfully!");
});

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
app.use("/api/banners", bannerRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/account", accountRoutes)

// ✅ Tạo HTTP server và tích hợp Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // hoặc cụ thể domain frontend của bạn
    methods: ["GET", "POST"],
  },
});

// ✅ Lắng nghe kết nối socket
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  // Ví dụ: gửi tin nhắn realtime
  socket.on("sendMessage", (message) => {
    console.log("📩 Received:", message);
    io.emit("newMessage", message); // gửi lại cho tất cả client
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Khởi động server
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
