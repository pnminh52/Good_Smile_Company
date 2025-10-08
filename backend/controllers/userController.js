import { sql } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../lib/mailerConfig.js";
import { getIO } from "../routes/socket.js";

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const registerUser = async (req, res) => {
  const { name, email, password, address, district = [], phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  try {
    // Check duplicate email
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Chuyển district thành mảng nếu user gửi chuỗi
    const districtArray = Array.isArray(district) ? district : [district];

    const user = await sql`
      INSERT INTO users (name, email, password, address, district, phone)
      VALUES (${name}, ${email}, ${hashedPassword}, ${address}, ${districtArray}::text[], ${phone})
      RETURNING id, name, email, address, district, phone
    `;

    res.status(201).json(user[0]);
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ error: "Register failed", detail: err.message });
  }
};




export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user.length) return res.status(400).json({ error: "User not found" });

    const validPass = await bcrypt.compare(password, user[0].password);
    if (!validPass) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user[0].id }, JWT_SECRET, { expiresIn: "7d" });
   
    try {
      const io = getIO();
      io.emit("userLogin", { userId: user[0].id, name: user[0].name });
    } catch (e) {
      console.warn("⚠️ Socket not initialized yet");
    }
   
    res.json({
      message: "Login success",
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
        address: user[0].address || "",
    district: user[0].district || "",
    phone: user[0].phone || "",
    avatar: user[0].avatar || ""
      }
    });
  
    
    
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user.length) return res.status(400).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await sql`
      INSERT INTO password_resets (user_id, token, expires_at)
      VALUES (${user[0].id}, ${token}, ${expires_at})
      ON CONFLICT (user_id) DO UPDATE
      SET token = ${token}, expires_at = ${expires_at};
    `;

    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}&email=${email}`;

    // Gửi mail và chờ xong mới trả response
    await sendResetPasswordEmail(email, resetLink);

    res.json({ message: "Reset password email sent successfully" });
  } catch (err) {
    console.error("❌ Forgot password error:", err.message);
    res.status(500).json({ error: "Could not send reset email" });
  }
};


export const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user.length) return res.status(400).json({ error: "User not found" });

    const reset = await sql`SELECT * FROM password_resets WHERE user_id = ${user[0].id} AND token = ${token}`;
    if (!reset.length) return res.status(400).json({ error: "Invalid token" });
    if (new Date(reset[0].expires_at) < new Date())
      return res.status(400).json({ error: "Token expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users SET password = ${hashedPassword} WHERE id = ${user[0].id}`;

    // Xóa token sau khi dùng
    await sql`DELETE FROM password_resets WHERE user_id = ${user[0].id}`;

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("❌ Reset password error:", err.message);
    res.status(500).json({ error: "Could not reset password" });
  }
};

export const updateProfile = async (req, res) => {
  const { name, phone, address, avatar, district } = req.body;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: "Not authorized" });

  try {
    const updated = await sql`
      UPDATE users
      SET
       name = COALESCE(${name}, name),
        phone = COALESCE(${phone}, phone),
        address = COALESCE(${address}, address),
        avatar = COALESCE(${avatar}, avatar),
        district = COALESCE(${district}::text[], district) -- district mảng string
      WHERE id = ${userId}
      RETURNING id, name, email, phone, address, avatar, district
    `;

    res.json({ message: "Profile updated", user: updated[0] });
  } catch (err) {
    console.error("❌ Update profile error:", err.message);
    res.status(500).json({ error: "Could not update profile" });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Not authorized" });

  try {
    const user = await sql`
      SELECT id, name, email, phone, address, district, avatar, is_delete_requested
      FROM users
      WHERE id = ${userId}
    `;
    if (!user.length) return res.status(404).json({ error: "User not found" });
    res.json(user[0]);
  } catch (err) {
    console.error("❌ Get profile error:", err.message);
    res.status(500).json({ error: "Could not get profile" });
  }
};

export const changePassword = async (req, res) => {
  const userId = req.user?.id;
  const { oldPassword, newPassword } = req.body;

  if (!userId) return res.status(401).json({ error: "Not authorized" });
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "Old and new password are required" });
  }

  try {
    const user = await sql`SELECT password FROM users WHERE id = ${userId}`;
    if (!user.length) return res.status(404).json({ error: "User not found" });

    const validPass = await bcrypt.compare(oldPassword, user[0].password);
    if (!validPass) return res.status(400).json({ error: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await sql`UPDATE users SET password = ${hashedPassword} WHERE id = ${userId}`;

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("❌ Change password error:", err.message);
    res.status(500).json({ error: "Could not change password" });
  }
};

