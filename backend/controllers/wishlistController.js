import { sql } from "../config/db.js";

export const getWishlist = async (req, res) => {
  const userId = req.params.userId;
  try {
    const wishlist = await sql`
      SELECT w.id, w.created_at, p.*
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = ${userId};
    `;
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await sql`SELECT is_delete_requested FROM users WHERE id = ${userId}`;
if (user[0]?.is_delete_requested) {
  return res.status(403).json({ error: "User pending deletion, cannot modify wishlist" });
}

    const exists = await sql`
      SELECT id FROM wishlist WHERE user_id = ${userId} AND product_id = ${productId};
    `;

    if (exists.length > 0) {
      return res.status(400).json({ error: "Product already in wishlist" });
    }

    const result = await sql`
      INSERT INTO wishlist (user_id, product_id)
      VALUES (${userId}, ${productId})
      RETURNING *;
    `;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const result = await sql`
      DELETE FROM wishlist 
      WHERE user_id = ${userId} AND product_id = ${productId}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    res.json({ message: "Removed from wishlist", item: result[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
