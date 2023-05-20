import { DB_CONNECTION_STRING } from "../config";
const mongoose = require("mongoose");

export const connectDB = () => {
    mongoose
        .connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { console.log("Connected to MongoDB") })
        .catch((err: any) => { console.log(err) });    
}
