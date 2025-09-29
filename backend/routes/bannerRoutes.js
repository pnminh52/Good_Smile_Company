import express from "express";
import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

// GET /api/banners
router.get("/", getBanners);

// GET /api/banners/:id
router.get("/:id", getBannerById);

// POST /api/banners
router.post("/", createBanner);

// PUT /api/banners/:id
router.put("/:id", updateBanner);

// DELETE /api/banners/:id
router.delete("/:id", deleteBanner);

export default router;
