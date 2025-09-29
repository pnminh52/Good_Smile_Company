import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.ARCJET_KEY) {
  throw new Error("Missing ARCJET_KEY in .env");
}

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // ví dụ: rate limit
    tokenBucket({
      mode: process.env.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN",
      capacity: 10,       // dung lượng bucket
      refillRate: 5,      // rate refill
      interval: 10,       // khoảng thời gian refill (giây)
    }),
    // ví dụ: detect bot
    detectBot({
      mode: process.env.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"],  // cho phép bot “search engine”
    }),
    // shield nếu muốn chống SQL injection, XSS, etc.
    shield({
      mode: process.env.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN",
    }),
  ],
});
