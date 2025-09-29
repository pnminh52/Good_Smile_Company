import { sql } from "../config/db.js";

// Lấy tất cả tin tức
export const getAllNews = async (req, res) => {
  try {
    const news = await sql`SELECT * FROM news ORDER BY created_at DESC`;
    res.status(200).json(news);
  } catch (error) {
    console.error("❌ Error getAllNews:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Thêm tin tức
export const createNews = async (req, res) => {
  try {
    const { title, content, type } = req.body;

    if (!title || !content || !type) {
      return res.status(400).json({ error: "Title, content và type là bắt buộc" });
    }

    const [newNews] = await sql`
      INSERT INTO news (title, content, type, created_at)
      VALUES (${title}, ${content}, ${type}, NOW())
      RETURNING *
    `;

    res.status(201).json(newNews);
  } catch (error) {
    console.error("❌ Error createNews:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Cập nhật tin tức
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type } = req.body;

    const [updatedNews] = await sql`
      UPDATE news
      SET title = ${title}, content = ${content}, type=${type}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedNews) {
      return res.status(404).json({ error: "News not found" });
    }

    res.status(200).json(updatedNews);
  } catch (error) {
    console.error("❌ Error updateNews:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Xóa tin tức
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedNews] = await sql`
      DELETE FROM news WHERE id = ${id} RETURNING *
    `;

    if (!deletedNews) {
      return res.status(404).json({ error: "News not found" });
    }

    res.status(200).json({ message: "News deleted successfully", deletedNews });
  } catch (error) {
    console.error("❌ Error deleteNews:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Lấy tin tức theo id
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const [news] = await sql`
      SELECT * FROM news WHERE id = ${id}
    `;

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    console.error("❌ Error getNewsById:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
