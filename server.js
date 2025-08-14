import "dotenv/config";
import express from "express";

import router from "./routes/router.js";

const server = express();

server.use(express.json());

server.use("/api", router);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
