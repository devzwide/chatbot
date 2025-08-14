import express from "express";
import geminiController from "../controllers/gemini.controller.js";

const router = express.Router();

router.use("/chat", geminiController);

export default router;
