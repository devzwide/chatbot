import express from "express";
import geminiController from "../controllers/gemini.controller.js";
import { healthCheck } from "../controllers/status.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Chatbot API");
});

router.use("/api/chat", geminiController);

router.use("/api/health", healthCheck);

export default router;
