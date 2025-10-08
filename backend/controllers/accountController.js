import { sql } from "../config/db.js";

// 🟢 User gửi yêu cầu xoá tài khoản
export const requestDeleteAccount = async (req, res) => {
  const userId = req.user?.id;
  const { reason } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    await sql`
      INSERT INTO delete_requests (user_id, reason, status, created_at)
      VALUES (${userId}, ${reason}, 'pending', NOW())
      ON CONFLICT (user_id) DO UPDATE SET reason = ${reason}, status = 'pending', created_at = NOW()
    `;

    await sql`UPDATE users SET is_delete_requested = true WHERE id = ${userId}`;

    res.json({ message: "Account deletion request sent. Waiting for admin confirmation." });
  } catch (err) {
    console.error("Error in requestDeleteAccount:", err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
  
  
};

// 🟠 Admin xem danh sách yêu cầu xoá
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
    res.status(500).json({ error: "Failed to fetch delete requests" });
  }
};

// 🔴 Admin xác nhận xoá hoặc từ chối
export const confirmDeleteAccount = async (req, res) => {
  const { userId, action } = req.body; // action: 'approve' | 'reject'
  const adminId = req.user?.id;

  if (!adminId) return res.status(401).json({ error: "Unauthorized" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden: admin only" });

  try {
    if (action === "approve") {
      await sql`DELETE FROM users WHERE id = ${userId}`;
      await sql`
        UPDATE delete_requests
        SET status = 'approved', reviewed_by = ${adminId}, reviewed_at = NOW()
        WHERE user_id = ${userId}
      `;
      res.json({ message: "User account deleted successfully." });
    } else {
      await sql`
        UPDATE delete_requests
        SET status = 'rejected', reviewed_by = ${adminId}, reviewed_at = NOW()
        WHERE user_id = ${userId}
      `;
      await sql`UPDATE users SET is_delete_requested = false WHERE id = ${userId}`;
      res.json({ message: "Delete request has been rejected." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process delete confirmation" });
  }
};
