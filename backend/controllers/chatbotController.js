import OpenAI from "openai";
import {sql} from "../config/db.js";




const client = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})

export const chatWithBot = async (req, res)=>{
    try {
        const {message}=req.body
        if(!message){
            return res.status(400).json({error:"Message is required"});
        }
        const products = await sql`
         SELECT id, name, price, base_image 
      FROM products 
      WHERE name ILIKE ${"%" + message + "%"} 
      LIMIT 5;
        `
        let dbResurtText=""
        if (products.length>0){
            "Mình tìm thấy một số sản phẩm phù hợp:\n" + products
            .map((p)=>`- ${p.name} (giá: ${p.price}đ, id: ${p.id})`)
            .join("\n");
        }
        else{
            dbResultText = "Trong kho chưa có sản phẩm phù hợp với yêu cầu.";
        } 
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "Bạn là chatbot tư vấn sản phẩm figure/anime cho cửa hàng." },
              { role: "user", content: message },
              { role: "assistant", content: dbResultText },
            ],
          });
          const reply = completion.choices[0].message.content;

          res.json({
            reply,
            products, // Gửi thêm dữ liệu sản phẩm 
          });
    }
    
    catch (error) {
        console.error("❌ Chatbot error:", error.message);
        res.status(500).json({ error: "Chatbot service error" });
    }
}