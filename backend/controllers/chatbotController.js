import axios from "axios";
import { sql } from "../config/db.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Kiểm tra key Gemini
    if (!process.env.GEMINI_KEY) {
      console.error("❌ GEMINI_KEY missing!");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    // Query DB sản phẩm
    const products = await sql`
      SELECT id, name, price, base_image 
      FROM products 
      WHERE name ILIKE ${"%" + message + "%"} 
      LIMIT 5;
    `;

    let dbResultText = "";
    if (products.length > 0) {
      dbResultText =
        "Mình tìm thấy một số sản phẩm:\n" +
        products.map(p => `- ${p.name} (giá: ${p.price}đ, id: ${p.id})`).join("\n");
    } else {
      dbResultText = "Không có sản phẩm phù hợp.";
    }

    // Gọi Gemini API
    const geminiResponse = await axios.post(
      "https://gemini.googleapis.com/v1/models/text-bison-001:generateText", // endpoint Gemini
      {
        prompt: `Bạn là chatbot tư vấn sản phẩm figure/anime. Thông tin sản phẩm: ${dbResultText}\nNgười dùng hỏi: ${message}`,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GEMINI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = geminiResponse.data.candidates?.[0]?.content || "Xin lỗi, bot chưa trả lời được.";

    res.json({ reply, products });
  } catch (err) {
    console.error("❌ Chatbot error:", err.message);
    res.status(500).json({ error: "Chatbot service error" });
  }
};
