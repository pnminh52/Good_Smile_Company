import { sql } from "../config/db.js";

// GET all categories + count products
export const getAllCategories = async (req, res) => {
  try {
    const categories = await sql`
      SELECT c.*, COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.id
      ORDER BY c.id DESC
    `;
    res.status(200).json(categories);
  } catch (error) {
    console.error("❌ Error getAllCategories:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


// GET category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [category] = await sql`SELECT * FROM categories WHERE id = ${id}`;
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("❌ Error getCategoryById:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE category
export const createCategory = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    if (!name) return res.status(400).json({ error: "Category name is required" });

    const [newCategory] = await sql`
      INSERT INTO categories (name, image, description)
      VALUES (${name}, ${image}, ${description})
      RETURNING *
    `;

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("❌ Error createCategory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;

    const [updatedCategory] = await sql`
      UPDATE categories
      SET name = ${name}, image = ${image}, description = ${description}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("❌ Error updateCategory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedCategory] = await sql`
      DELETE FROM categories WHERE id = ${id} RETURNING *
    `;

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleteCategory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
