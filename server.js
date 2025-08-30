import "dotenv/config";
import express from "express";
import cors from "cors";

import router from "./routes/router.js";
import { endPointNotFound, internalServerError } from "./controllers/error.controller.js";

const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use(cors({ origin: process.env.CORS_ORIGIN }));

server.use("/", router);

server.use(endPointNotFound);
server.use(internalServerError);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
