import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadImage);

export default router;
