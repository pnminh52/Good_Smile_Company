import OpenAI from "openai";
import { sql } from "../config/db.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Test OpenAI key tồn tại
    console.log("OPENAI_API_KEY exists?", !!process.env.OPENAI_API_KEY);


    // DB query
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



    // OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Bạn là chatbot tư vấn sản phẩm figure/anime." },
        { role: "user", content: message },
        { role: "assistant", content: dbResultText },
      ],
    });

    res.json({ reply: completion.choices[0].message.content, products });
  } catch (err) {
    console.error("❌ Chatbot error:", err);
    res.status(500).json({ error: "Chatbot service error" });
  }
};
