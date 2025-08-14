import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const geminiController = async (req, res) => {
    try {
        const { message } = req.body;
        const SYSTEM_INSTRUCTION_TEXT = process.env.SYSTEM_INSTRUCTION_TEXT;
        const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
       
        if (!message) {
            return res.status(400).json({ error: "Message is required in the request body." });
        }

        if (!SYSTEM_INSTRUCTION_TEXT) {
            return res.status(500).json({ error: "System instructions are not configured." });
        }

        const tools = [{
            googleSearch: {},
        }];

        const config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
            tools,
            systemInstruction: [
                {
                    text: SYSTEM_INSTRUCTION_TEXT,
                },
            ],
        };

        const model = "gemini-2.5-flash";
        
        const contents = [
            {
                role: "user",
                parts: [
                    {
                        text: message,
                    },
                ],
            },
        ];

        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");

        const response = await genAI.models.generateContentStream({ 
            model,
            config,
            contents,
        });

        if (!response) {
            return res.status(500).json({ error: "No response from Gemini API." });
        }

        for await (const chunk of response) {
            res.write(chunk.text);
        }

        res.end();

    } catch (error) {
       if (!res.headersSent) {
            if (
                error.message &&
                error.message.includes("RESOURCE_EXHAUSTED")
            ) {
                return res.status(429).json({
                    error: "API quota exceeded. Please try again later or check your billing details.",
                    details: error.message,
                });
            }
            res.status(500).json({ error: "An internal server error occurred.", details: error.message });
        }
    }
};

export default geminiController;
