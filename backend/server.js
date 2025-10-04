import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import newRoutes from "./routes/newRoutes.js"
import bannerRoutes from "./routes/bannerRoutes.js"
import chatbotRoutes from"./routes/chatbotRoutes.js"
import vnPayRoutes from "./routes/vnPayRoutes.js"


import { sql } from "./config/db.js";
import { aj } from "./lib/arcjetConfig.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// app.use(cors({
//   origin: ["http://localhost:5173",
//      "http://localhost:3000", 
//      "https://good-smile-company.vercel.app",
//     "https://good-smile-company-1.onrender.com"],
//   credentials: true,
// }));

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use('/api/payment/ipn', express.urlencoded({ extended: false }));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend run successfully!");
});


app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }
    if (
      decision.results.some(
        (results) => results.reason.isBot() && results.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
});


// Dùng route
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
app.use("/api/chatbot", chatbotRoutes)

// console.log("TMN:", `"${process.env.VNP_TMNCODE}"`);
// console.log("HASH:", `"${process.env.VNP_HASH_SECRET}"`);





// async function initDB() {
//   try {
//     // 1. Categories
//     await sql`
//       CREATE TABLE IF NOT EXISTS categories (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         image TEXT,
//         description TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     // 2. News
//     await sql`
//       CREATE TABLE IF NOT EXISTS news (
//         id SERIAL PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         type VARCHAR(100),
//         content TEXT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     // 3. Products
//     await sql`
//       CREATE TABLE IF NOT EXISTS products (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         title VARCHAR(255),
//         series VARCHAR(255),
//         release_date DATE,
//         decalProduction VARCHAR(255),
//         specifications TEXT,
//         sculptor VARCHAR(255),
//         planningAndProduction VARCHAR(255),
//         productionCooperation VARCHAR(255),
//         paintwork VARCHAR(255),
//         relatedInformation TEXT,
//         manufacturer VARCHAR(255),
//         distributedBy VARCHAR(255),
//         price DECIMAL(10,2) NOT NULL,
//         stock INT DEFAULT 0,
//         status VARCHAR(50) DEFAULT 'available',
//         base_image TEXT,
//         imagecopyright TEXT,
//         sold INT DEFAULT 0,
//         additional_images TEXT[],
//         category_id INT REFERENCES categories(id) ON DELETE SET NULL,
//         description TEXT,
//         copyrightSeries VARCHAR(255),
//         gift_items JSONB DEFAULT '[]',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     // 4. Shipping
//     await sql`
//       CREATE TABLE IF NOT EXISTS shipping (
//         id SERIAL PRIMARY KEY,
//         region VARCHAR(255) NOT NULL,
//         min_order DECIMAL(10,2),
//         fee DECIMAL(10,2) NOT NULL
//       )
//     `;

//     // 5. Users (orders & some tables depend on this)
//     await sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         district TEXT[],
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         phone VARCHAR(20),
//         address TEXT,
//         avatar TEXT,
//         role VARCHAR(50) DEFAULT 'customer',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     // 6. Cart (depends on users & products)
//     await sql`
//       CREATE TABLE IF NOT EXISTS cart (
//         id SERIAL PRIMARY KEY,
//         user_id INT REFERENCES users(id) ON DELETE CASCADE,
//         product_id INT REFERENCES products(id) ON DELETE CASCADE,
//         quantity INT NOT NULL DEFAULT 1,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     // 7. Password resets
//     await sql`
//       CREATE TABLE IF NOT EXISTS password_resets (
//         id SERIAL PRIMARY KEY,
//         user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
//         token VARCHAR(255) NOT NULL,
//         expires_at TIMESTAMP NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     // 8. Order status (create BEFORE orders)
//     await sql`
//       CREATE TABLE IF NOT EXISTS order_status (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(50) NOT NULL,
//         description TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     // 9. Orders (create BEFORE order_items)
//     await sql`
//       CREATE TABLE IF NOT EXISTS orders (
//         id SERIAL PRIMARY KEY,
//         user_id INT REFERENCES users(id) ON DELETE CASCADE,
//         total DECIMAL(10,2) NOT NULL,
//         shipping_fee DECIMAL(10,2) DEFAULT 0,
//         status_id INT REFERENCES order_status(id) ON DELETE SET NULL,
//         address TEXT,
//         district TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         payment_method VARCHAR(50)
//       )
//     `;

//     // 10. Order items (now orders exist)
//     await sql`
//       CREATE TABLE IF NOT EXISTS order_items (
//         id SERIAL PRIMARY KEY,
//         order_id INT REFERENCES orders(id) ON DELETE CASCADE,
//         product_id INT REFERENCES products(id) ON DELETE CASCADE,
//         quantity INT NOT NULL,
//         price DECIMAL(10,2) NOT NULL
//       )
//     `;

//     // 11. Banners
//     await sql`
//       CREATE TABLE IF NOT EXISTS banners (
//         id SERIAL PRIMARY KEY,
//         title VARCHAR(255),
//         image_mobile TEXT NOT NULL,
//         image_desktop TEXT NOT NULL,
//         link TEXT,
//         status VARCHAR(50) DEFAULT 'active',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     // 12. Wishlist
//     await sql`
//       CREATE TABLE IF NOT EXISTS wishlist (
//         id SERIAL PRIMARY KEY,
//         user_id INT REFERENCES users(id) ON DELETE CASCADE,
//         product_id INT REFERENCES products(id) ON DELETE CASCADE,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         UNIQUE(user_id, product_id)
//       )
//     `;

//     console.log("✅ Database initialized successfully (Apple schema)");
//   } catch (error) {
//     console.error("❌ DB error:", error.message);
//   }
// }


// Gọi hàm khởi tạo DB
// initDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("✅ Server running on http://localhost:" + PORT);
//   });
// });


app.listen(PORT, () => {
  console.log("✅ Server running on http://localhost:" + PORT);
});
