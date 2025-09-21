import { sql } from "../config/db.js";

// ✅ GET all products (kèm category_name)
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
// ✅ GET recommended products (cùng series, trừ sản phẩm hiện tại)
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

// ✅ GET products by same category (trừ sản phẩm hiện tại)
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

// ✅ GET product by ID
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

// ✅ CREATE new product
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
      status,
      base_image,
      imagecopyright,
      additional_images = [],
      category_id,
      description,
      copyrightSeries,
    } = req.body;

    if (!name || !base_image) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newProduct] = await sql`
      INSERT INTO products (
        name, title, series, release_date, decalProduction, specifications, sculptor,
        planningAndProduction, productionCooperation, paintwork, relatedInformation,
        manufacturer, distributedBy, price, stock, status, base_image, imagecopyright,
        additional_images, category_id, description, copyrightSeries
      )
      VALUES (
        ${name}, ${title}, ${series}, ${release_date}, ${decalProduction}, ${specifications}, ${sculptor},
        ${planningAndProduction}, ${productionCooperation}, ${paintwork}, ${relatedInformation},
        ${manufacturer}, ${distributedBy}, ${price}, ${stock}, ${status}, ${base_image}, ${imagecopyright},
        COALESCE(${additional_images}::text[], '{}'), ${category_id || null}, ${description}, ${copyrightSeries}
      )
      RETURNING *
    `;

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error createProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ UPDATE product
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
      status,
      base_image,
      imagecopyright,
      additional_images = [],
      category_id,
      description,
      copyrightSeries,
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
        status = ${status},
        base_image = ${base_image},
        imageCopyright=${imagecopyright},
        additional_images = COALESCE(${additional_images}::text[], '{}'),
        category_id = ${category_id || null},
        description = ${description},
        copyrightSeries = ${copyrightSeries}
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

// ✅ DELETE product
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
