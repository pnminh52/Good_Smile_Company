import { sql } from "../config/db.js";

export const requestDeleteAccount = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    await sql`
      INSERT INTO delete_requests (user_id, status, created_at)
      VALUES (${userId}, 'pending', NOW())
    `;
    res.json({ message: "Yêu cầu xóa tài khoản đã được gửi, chờ admin xác nhận" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể gửi yêu cầu xóa tài khoản" });
  }
};

export const getDeleteRequests = async (req, res) => {
  try {
    const requests = await sql`
      SELECT dr.*, u.email, u.name
      FROM delete_requests dr
      JOIN users u ON dr.user_id = u.id
      WHERE dr.status = 'pending'
    `;
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể lấy danh sách yêu cầu xóa" });
  }
};

export const confirmDeleteAccount = async (req, res) => {
  const { userId, confirm } = req.body;
  const adminId = req.user?.id;

  if (!adminId) return res.status(401).json({ error: "Unauthorized" });
  if (!confirm) return res.status(400).json({ error: "Thiếu xác nhận" });

  try {
    await sql`DELETE FROM users WHERE id = ${userId}`;
    await sql`UPDATE delete_requests SET status = 'approved' WHERE user_id = ${userId}`;

    res.json({ message: "Tài khoản đã được xóa thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể xóa tài khoản" });
  }
};
