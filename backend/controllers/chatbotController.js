import axios from "axios";
import { sql } from "../config/db.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    if (!process.env.GEMINI_KEY) {
      console.error("❌ GEMINI_KEY missing!");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    let dbResultText = "Không có sản phẩm phù hợp.";

    if (message.length > 2) {
      const products = await sql`
        SELECT id, name, price, base_image 
        FROM products 
        WHERE name ILIKE ${"%" + message + "%"} 
        LIMIT 5;
      `;

      if (products.length > 0) {
        dbResultText =
          "Mình tìm thấy một số sản phẩm:\n" +
          products.map(p => `- ${p.name} (giá: ${p.price}đ, id: ${p.id})`).join("\n");
      }
    }

    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [
          {
            parts: [
              { text: `Bạn là chatbot tư vấn sản phẩm figure/anime. Thông tin sản phẩm: ${dbResultText}\nNgười dùng hỏi: ${message}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GEMINI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, bot chưa trả lời được.";

    res.json({ reply });
  } catch (err) {
    console.error("❌ Chatbot error:", err.message);
    res.status(500).json({ error: "Chatbot service error" });
  }
};
