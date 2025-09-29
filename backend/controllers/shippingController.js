import { sql } from "../config/db.js";

export const getShippingFee = async (req, res) => {
  let { region } = req.query;

  try {
    if (!region) return res.json({ fee: 0 });

    // decode URL nếu có %20, %C3%B4...
    region = decodeURIComponent(region);

    const fee = await sql`
      SELECT fee
      FROM shipping
      WHERE LOWER(TRIM(region)) = LOWER(TRIM(${region}))
      LIMIT 1
    `;

    res.json({ fee: fee[0]?.fee || 0 });
  } catch (err) {
    // console.error("Shipping fee error:", err);
    res.status(500).json({ fee: 0 });
  }
};


