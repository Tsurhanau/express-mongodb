import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION_TIME_MS } from "../config";

export const login = (req: Request, res: Response) => {
	const {username, password} = req.body;
    
	if (!username || !password) {
		res.status(403).json({message: "invalid credentials"});
	} else {
		res.send(jwt.sign({username}, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME_MS })); 
	}
};