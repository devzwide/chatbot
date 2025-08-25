import "dotenv/config";
import connectToDatabase from "../config/db.config.js";
import { GoogleGenAI } from "@google/genai";

const geminiController = async (req, res) => {
    try {
        const { message } = req.body;
        const db = await connectToDatabase();
        
        const configCollection = db.collection("config");
        const configDoc = await configCollection.findOne({ key: "system_instruction" });
        const SYSTEM_INSTRUCTION_TEXT = configDoc.system_instruction;

        const messagesCollection = db.collection("messages");
            
        const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
        
        const tools = [{ googleSearch: {}, }];

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

        let fullResponse = "";

        for await (const chunk of response) {
            fullResponse += chunk.text;
            res.write(chunk.text);
        }

        res.end();

        await messagesCollection.insertOne({
            userMessage: message,
            botResponse: fullResponse,
            timestamp: new Date(),
        });

    } catch (error) {
        console.error("Error in geminiController:", error);
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
