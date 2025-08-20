import "dotenv/config";
import express from "express";
import cors from "cors";

import router from "./routes/router.js";

const server = express();

server.use(express.json());
server.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

server.use("/api", router);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
