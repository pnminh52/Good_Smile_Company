import { sql } from "../config/db.js";

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await sql`
      SELECT 
        o.id, 
        o.total, 
        o.status_id, 
        os.name AS status, 
        o.address, 
        o.district, 
        o.created_at, 
        o.payment_method,
        CASE 
          WHEN o.payment_method = 'Cash On Delivery' THEN 'Cash On Delivery'
          WHEN o.payment_method = 'Online Banking' THEN 'Online Banking'
          ELSE 'Not Determined'
        END AS payment_method_name,
        COALESCE(
          json_agg(
            json_build_object(
              'product_id', oi.product_id, 
              'name', p.name, 
              'quantity', oi.quantity, 
              'price', oi.price
            )
          ) FILTER (WHERE oi.id IS NOT NULL), 
          '[]'
        ) AS items
      FROM orders o
      LEFT JOIN order_status os ON o.status_id = os.id
      LEFT JOIN order_items oi ON oi.order_id = o.id
      LEFT JOIN products p ON p.id = oi.product_id
      WHERE o.user_id = ${userId}
      GROUP BY o.id, os.name
      ORDER BY o.created_at DESC
    `;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await sql`
      SELECT 
        o.id, 
        o.total, 
        o.status_id, 
        os.name AS status, 
        o.address, 
        o.district, 
        o.created_at, 
        o.payment_method,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.phone AS user_phone,
        CASE 
          WHEN o.payment_method = 'Cash On Delivery' THEN 'Cash On Delivery'
          WHEN o.payment_method = 'Online Banking' THEN 'Online Banking'
          ELSE 'Not Determined'
        END AS payment_method_name,
        COALESCE(
          json_agg(
            json_build_object(
              'product_id', oi.product_id, 
              'name', p.name, 
              'quantity', oi.quantity, 
              'price', oi.price
            )
          ) FILTER (WHERE oi.id IS NOT NULL), 
          '[]'
        ) AS items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_status os ON o.status_id = os.id
      LEFT JOIN order_items oi ON oi.order_id = o.id
      LEFT JOIN products p ON p.id = oi.product_id
      GROUP BY o.id, os.name, u.id, u.name, u.email, u.phone
      ORDER BY o.created_at DESC
    `;

    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getOrderDetail = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;
  try {
    const order = await sql`
    SELECT 
      o.id, o.total, o.status_id, os.name AS status,
      o.address, o.district, o.created_at,
      o.payment_method,
      CASE 
        WHEN o.payment_method = 'Cash On Delivery' THEN 'Cash On Delivery'
        WHEN o.payment_method = 'Online Banking' THEN 'Online Banking'
        ELSE 'Not Determined'
      END AS payment_method_name
    FROM orders o
    LEFT JOIN order_status os ON o.status_id = os.id
    WHERE o.id = ${orderId} AND o.user_id = ${userId}
  `;
  


    if (!order.length) return res.status(404).json({ error: "Order not found" });

    const items = await sql`
      SELECT oi.id, oi.product_id,p.title, p.name, p.base_image, oi.quantity, oi.price
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ${orderId}
    `;

    res.json({ ...order[0], items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createOrder = async (req, res) => {
//   console.log(req.body);
//   console.log("🟩 req.body:", req.body);
// console.log("🟩 payment_method:", req.body.payment_method);

  
  const userId = req.user.id;
  const { items, address, selectedDistrict, shippingFee, payment_method } = req.body;

  if (!items || !items.length)
    return res.status(400).json({ error: "No items in order" });

  try {
    // Tính tổng tiền sản phẩm
    let totalProducts = 0;
    for (const item of items) {
      const product = await sql`SELECT price, stock FROM products WHERE id = ${item.product_id}`;
      if (!product.length) return res.status(400).json({ error: "Product not found" });
      if (product[0].stock < item.quantity)
        return res.status(400).json({ error: "Insufficient stock" });
      totalProducts += Number(product[0].price) * item.quantity;
    }
    const totalWithShip = totalProducts + Number(shippingFee || 0);

    // Lấy address mặc định nếu frontend không gửi
    let orderAddress = address;
    if (!orderAddress) {
      const [userRecord] = await sql`SELECT address, district FROM users WHERE id = ${userId}`;
      orderAddress = userRecord.address;
    }

    // 🔹 Phân biệt phương thức thanh toán
    // status_id: 1 = Chờ thanh toán, 2 = Đã thanh toán (tùy hệ thống bạn định nghĩa)
    const statusId =  1 ;

    // Tạo order
    const [order] = await sql`
      INSERT INTO orders (user_id, total, shipping_fee, status_id, address, district, payment_method)
      VALUES (${userId}, ${totalWithShip}, ${shippingFee}, ${statusId}, ${orderAddress}, ${selectedDistrict}, ${payment_method})
      RETURNING *
    `;

    // Cập nhật mảng district trong users nếu district mới
    const [userRecord] = await sql`SELECT district FROM users WHERE id = ${userId}`;
    const userDistricts = userRecord.district || [];
    if (selectedDistrict && !userDistricts.includes(selectedDistrict)) {
      await sql`
        UPDATE users
        SET district = ${[...userDistricts, selectedDistrict]}
        WHERE id = ${userId}
      `;
    }

    // Thêm order items và trừ stock
    for (const item of items) {
      const product = await sql`SELECT price FROM products WHERE id = ${item.product_id}`;
      await sql`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (${order.id}, ${item.product_id}, ${item.quantity}, ${product[0].price})
      `;
      await sql`
        UPDATE products SET stock = stock - ${item.quantity} WHERE id = ${item.product_id}
      `;
      await sql`
        UPDATE products SET sold = sold + ${item.quantity} WHERE id = ${item.product_id}
      `;
    }

    res.status(201).json({
      message: "Order created successfully",
      orderId: order.id,
      shippingFee,
      total: totalWithShip,
      address: orderAddress,
      district: selectedDistrict,
      payment_method,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status_id } = req.body;

  try {
    const [order] = await sql`SELECT * FROM orders WHERE id = ${orderId}`;
    if (!order) return res.status(404).json({ error: "Order not found" });

    await sql`
      UPDATE orders SET status_id = ${status_id} WHERE id = ${orderId}
    `;

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
