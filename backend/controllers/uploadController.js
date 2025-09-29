import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    console.log("➡️ req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "avatars" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(fs.readFileSync(req.file.path));
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};
