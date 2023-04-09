import express from "express";
import { Express } from "express";
import { router } from "./api/routes/userRoutes";
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log("Connected to MongoDB") })
.catch((err: any) => { console.log(err) });

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", router);

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on PORT: ${process.env.PORT}`);
});