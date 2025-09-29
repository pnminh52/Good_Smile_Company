import express from "express";
import { getAllCategories, getCategoryById, createCategory, deleteCategory, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
