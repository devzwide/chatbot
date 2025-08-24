import express from "express";
import geminiController from "../controllers/gemini.controller.js";
import { healthCheck } from "../controllers/status.controller.js";

const router = express.Router();

router.use("/chat", geminiController);

router.use("/health", healthCheck);

export default router;
