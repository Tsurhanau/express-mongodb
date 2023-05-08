import express from "express";
import { Express } from "express";
import { router } from "./routes/userRoutes";
require("dotenv").config();
import cors from "cors"
import { apiLogger } from "./middleware/api-logger";
import { errorHandler } from "./middleware/error-handle";
import { logger } from "./middleware/logger";
import { loginRouter } from "./routes/loginRoutes";
import { DB_CONNECTION_STRING, SERVER_PORT } from "./config";
import { checkAuthToken } from "./middleware/auth";

const mongoose = require("mongoose");

mongoose
.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log("Connected to MongoDB") })
.catch((err: any) => { console.log(err) });

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(apiLogger);
app.use(errorHandler);

process.on("uncaughtException", (error, source) => {
	logger.error(`${source}: ${ error}`);
	process.exit(1);
});

process.on("unhandledRejection", (error, source) => {
	logger.error(`${source}: ${ error}`);
	process.exit(1);
});

app.use("/login", loginRouter);
app.use("/users", checkAuthToken, router);

app.listen(SERVER_PORT, () => {
	console.log(`Server is listening on PORT: ${SERVER_PORT}`);
});