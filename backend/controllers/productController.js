import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `;

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error getAllProducts:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getRecommendedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy product hiện tại
    const [currentProduct] = await sql`
      SELECT series FROM products WHERE id = ${id}
    `;

    if (!currentProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const { series } = currentProduct;

    if (!series) {
      return res.status(200).json([]); // sản phẩm không có series thì trả về rỗng
    }

    // Lấy danh sách sản phẩm khác cùng series
    const products = await sql`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.series = ${series} AND p.id != ${id}
      ORDER BY p.id DESC
      LIMIT 10
    `;

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error getRecommendedProducts:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductsBySameCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy category_id của product hiện tại
    const [currentProduct] = await sql`
      SELECT category_id FROM products WHERE id = ${id}
    `;

    if (!currentProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const categoryId = currentProduct.category_id;

    if (!categoryId) {
      return res.status(200).json([]); // sản phẩm không có category thì trả về rỗng
    }

    // Lấy sản phẩm khác cùng category
    const products = await sql`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ${categoryId} AND p.id != ${id}
      ORDER BY p.id DESC
      LIMIT 10
    `;

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error getProductsBySameCategory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await sql`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id}
    `;

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error getProductById:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      title,
      series,
      release_date,
      decalProduction,
      specifications,
      sculptor,
      planningAndProduction,
      productionCooperation,
      paintwork,
      relatedInformation,
      manufacturer,
      distributedBy,
      price,
      stock,
      sold = 0,
      status,
      base_image,
      imagecopyright,
      additional_images = [],
      category_id,
      description,
      copyrightSeries,
      gift_items = [], // <-- thêm gift_items
    } = req.body;

    if (!name || !base_image) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newProduct] = await sql`
      INSERT INTO products (
        name, title, series, release_date, decalProduction, specifications, sculptor,
        planningAndProduction, productionCooperation, paintwork, relatedInformation,
        manufacturer, distributedBy, price, stock, sold, status, base_image, imagecopyright,
        additional_images, category_id, description, copyrightSeries, gift_items
      )
      VALUES (
        ${name}, ${title}, ${series}, ${release_date}, ${decalProduction}, ${specifications}, ${sculptor},
        ${planningAndProduction}, ${productionCooperation}, ${paintwork}, ${relatedInformation},
        ${manufacturer}, ${distributedBy}, ${price}, ${stock}, ${sold}, ${status}, ${base_image}, ${imagecopyright},
        COALESCE(${additional_images}::text[], '{}'), ${category_id || null}, ${description}, ${copyrightSeries},
        COALESCE(${JSON.stringify(gift_items)}::jsonb, '[]')
      )
      RETURNING *
    `;

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error createProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      title,
      series,
      release_date,
      decalProduction,
      specifications,
      sculptor,
      planningAndProduction,
      productionCooperation,
      paintwork,
      relatedInformation,
      manufacturer,
      distributedBy,
      price,
      stock,
      sold,
      status,
      base_image,
      imagecopyright,
      additional_images = [],
      category_id,
      description,
      copyrightSeries,
      gift_items = [], // <-- thêm gift_items
    } = req.body;

    const [updatedProduct] = await sql`
      UPDATE products
      SET
        name = ${name},
        title = ${title},
        series = ${series},
        release_date = ${release_date},
        decalProduction = ${decalProduction},
        specifications = ${specifications},
        sculptor = ${sculptor},
        planningAndProduction = ${planningAndProduction},
        productionCooperation = ${productionCooperation},
        paintwork = ${paintwork},
        relatedInformation = ${relatedInformation},
        manufacturer = ${manufacturer},
        distributedBy = ${distributedBy},
        price = ${price},
        stock = ${stock},
        sold = ${sold},
        status = ${status},
        base_image = ${base_image},
        imageCopyright = ${imagecopyright},
        additional_images = COALESCE(${additional_images}::text[], '{}'),
        category_id = ${category_id || null},
        description = ${description},
        copyrightSeries = ${copyrightSeries},
        gift_items = COALESCE(${JSON.stringify(gift_items)}::jsonb, '[]')
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ Error updateProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedProduct] = await sql`
      DELETE FROM products WHERE id = ${id} RETURNING *
    `;

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleteProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartRecommendedProducts = async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: "No products in cart" });
    }

    // Lấy thông tin các sản phẩm trong giỏ
    const cartProducts = await sql`
      SELECT id, series, category_id
      FROM products
      WHERE id = ANY(${productIds})
    `;

    if (!cartProducts.length) return res.status(200).json([]);

    // Lấy danh sách series và category hợp lệ
    const seriesList = cartProducts.map(p => p.series).filter(Boolean);
    const categoryList = cartProducts.map(p => p.category_id).filter(Boolean);

    if (!seriesList.length && !categoryList.length) return res.status(200).json([]);

    // Tạo điều kiện query an toàn
    const seriesCondition = seriesList.length
      ? sql`p.series = ANY(${seriesList})`
      : sql`FALSE`;
    const categoryCondition = categoryList.length
      ? sql`p.category_id = ANY(${categoryList})`
      : sql`FALSE`;

    // Lấy sản phẩm gợi ý, loại trừ sản phẩm trong giỏ
    const recommendedProducts = await sql`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE (${seriesCondition} OR ${categoryCondition})
        AND p.id != ALL(${productIds})
      ORDER BY p.id DESC
      LIMIT 10
    `;

    res.status(200).json(recommendedProducts);
  } catch (error) {
    console.error("❌ Error getCartRecommendedProducts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


