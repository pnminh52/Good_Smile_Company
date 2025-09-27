import { sql } from "../config/db.js";

// Lấy tất cả banners
export const getBanners = async (req, res) => {
  try {
    const banners = await sql`SELECT * FROM banners ORDER BY created_at DESC`;
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy banner theo ID
export const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner =
      await sql`SELECT * FROM banners WHERE id = ${id} LIMIT 1`;
    if (banner.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.json(banner[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo banner mới
export const createBanner = async (req, res) => {
  try {
    const { title, image_mobile, image_desktop, link, status } = req.body;
    const newBanner = await sql`
      INSERT INTO banners (title, image_mobile, image_desktop, link, status)
      VALUES (${title}, ${image_mobile}, ${image_desktop}, ${link}, ${status || "active"})
      RETURNING *;
    `;
    res.status(201).json(newBanner[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật banner
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image_mobile, image_desktop, link, status } = req.body;

    const updated = await sql`
      UPDATE banners 
      SET 
        title = COALESCE(${title}, title),
        image_mobile = COALESCE(${image_mobile}, image_mobile),
        image_desktop = COALESCE(${image_desktop}, image_desktop),
        link = COALESCE(${link}, link),
        status = COALESCE(${status}, status)
      WHERE id = ${id}
      RETURNING *;
    `;

    if (updated.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa banner
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted =
      await sql`DELETE FROM banners WHERE id = ${id} RETURNING *`;
    if (deleted.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
