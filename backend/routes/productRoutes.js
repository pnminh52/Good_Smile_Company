import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBySameCategory,
  getRecommendedProducts,
  getCartRecommendedProducts
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id/same-category", getProductsBySameCategory);
router.get("/:id/recommended", getRecommendedProducts);
router.post("/cart-recommend", getCartRecommendedProducts);

export default router;
