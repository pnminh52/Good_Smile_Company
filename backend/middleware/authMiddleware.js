import { sql } from "../config/db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Middleware: xác thực user
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Not authorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Kiểm tra user có tồn tại không
    const user = await sql`SELECT id, role FROM users WHERE id = ${decoded.id}`;
    if (!user.length) {
      return res.status(401).json({ error: "User does not exist. Please log in again!" });
    }

    req.user = { id: user[0].id, role: user[0].role };
    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err.message);
    return res.status(401).json({ error: "Token is invalid or expired!" });
  }
};

// ✅ Middleware: chỉ cho phép admin
export const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Permission denied. Admin only!" });
  }
  next();
};
