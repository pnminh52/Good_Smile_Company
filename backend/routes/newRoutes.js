
import express from "express"
import { getAllNews, createNews, updateNews, deleteNews, getNewsById } from "../controllers/newController.js";
const router = express.Router();

router.get("/", getAllNews)
router.post("/", createNews)
router.put("/:id", updateNews)
router.get("/:id", getNewsById)
router.delete("/:id", deleteNews)
export default router