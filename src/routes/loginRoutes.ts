import { Router } from "express";
import { login } from "../controllers/login";

export const loginRouter = Router().post("/", login);