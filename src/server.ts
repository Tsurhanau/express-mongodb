import express from "express";
import { Express } from "express";
import { router } from "./routes/userRoutes";
require("dotenv").config();
import cors from "cors"
import { apiLogger } from "./middleware/api-logger";
import { errorHandler } from "./middleware/error-handle";
import { logger } from "./middleware/logger";
import { loginRouter } from "./routes/loginRoutes";
import { SERVER_PORT } from "./config";
import { checkAuthToken } from "./middleware/auth";
import { connectDB } from "./utils/connect-db";


const app: Express = express();

connectDB();

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