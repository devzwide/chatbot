import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import router from "./routes/router.js";
import { endPointNotFound, internalServerError } from "./controllers/error.controller.js";

const server = express();
const PORT = process.env.PORT || 8000;

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors({ origin: "*" }));
server.use(rateLimit({ windowMs: 60 * 1000, max: 30 }));

server.use("/api", router);

server.use(endPointNotFound);
server.use(internalServerError);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
