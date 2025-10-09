import { sql } from "../config/db.js";

export const requestDeleteAccount = async (req, res) => {
  const userId = req.user?.id;
  const { reason } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  if (!reason || !reason.trim()) return res.status(400).json({ error: "Reason is required" });

  try {
    await sql`
      INSERT INTO delete_requests (user_id, reason, status, created_at)
      VALUES (${userId}, ${reason}, 'pending', NOW())
      ON CONFLICT (user_id) DO UPDATE
      SET reason = EXCLUDED.reason,
          status = 'pending',
          created_at = NOW()
    `;

    await sql`UPDATE users SET is_delete_requested = true WHERE id = ${userId}`;

    await sql`DELETE FROM cart WHERE user_id = ${userId}`;

    await sql`DELETE FROM wishlist WHERE user_id = ${userId}`;

    res.json({ message: "Account deletion request sent. Cart and wishlist cleared." });
  } catch (err) {
    console.error("Error in requestDeleteAccount:", err.message, err.stack);
    res.status(500).json({ error: "Failed to send delete request." });
  }
};

// 🟠 Admin xem danh sách yêu cầu pending
export const getDeleteRequests = async (req, res) => {
  try {
    const requests = await sql`
      SELECT dr.id, dr.user_id, dr.reason, dr.status, dr.created_at, u.email, u.name
      FROM delete_requests dr
      JOIN users u ON dr.user_id = u.id
      WHERE dr.status = 'pending'
      ORDER BY dr.created_at ASC
    `;
    res.json(requests);
  } catch (err) {
    console.error("Error in getDeleteRequests:", err.message);
    res.status(500).json({ error: "Failed to fetch delete requests." });
  }
};

// 🔴 Admin xác nhận xóa hoặc từ chối
export const confirmDeleteAccount = async (req, res) => {
  const { userId, action } = req.body; // action: 'approve' | 'reject'
  const adminId = req.user?.id;

  if (!adminId) return res.status(401).json({ error: "Unauthorized" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden: admin only" });
  if (!userId || !action) return res.status(400).json({ error: "userId and action are required" });

  try {
    if (action === "approve") {
      // Xóa user
      await sql`DELETE FROM users WHERE id = ${userId}`;

      // Cập nhật request thành approved
      await sql`
        UPDATE delete_requests
        SET status = 'approved', reviewed_by = ${adminId}, reviewed_at = NOW()
        WHERE user_id = ${userId}
      `;
      res.json({ message: "User account deleted successfully." });
    } else if (action === "reject") {
      // Cập nhật request thành rejected
      await sql`
        UPDATE delete_requests
        SET status = 'rejected', reviewed_by = ${adminId}, reviewed_at = NOW()
        WHERE user_id = ${userId}
      `;

      // Reset cờ is_delete_requested
      await sql`UPDATE users SET is_delete_requested = false WHERE id = ${userId}`;
      res.json({ message: "Delete request has been rejected." });
    } else {
      res.status(400).json({ error: "Invalid action" });
    }
  } catch (err) {
    console.error("Error in confirmDeleteAccount:", err.message, err.stack);
    res.status(500).json({ error: "Failed to process delete confirmation." });
  }
};

// 🟡 User hủy yêu cầu xóa tài khoản
export const cancelDeleteAccount = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Cập nhật status của request
    await sql`
      UPDATE delete_requests
      SET status = 'canceled'
      WHERE user_id = ${userId} AND status = 'pending'
    `;

    // Reset cờ trong bảng users
    await sql`
      UPDATE users
      SET is_delete_requested = false
      WHERE id = ${userId}
    `;

    res.json({ message: "Your delete request has been canceled." });
  } catch (err) {
    console.error("Error in cancelDeleteAccount:", err);
    res.status(500).json({ error: "Failed to cancel delete request" });
  }
};
