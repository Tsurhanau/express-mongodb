import {NextFunction, Request, Response} from "express";
import { verify } from "jsonwebtoken";
import { JWT_HTTP_HEADER_KEY, JWT_SECRET } from "../config";

export const checkAuthToken = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers[JWT_HTTP_HEADER_KEY] as string;

	if (!token){
		res.status(403)
			.send({success: false, message: "No token provided."});
	}
	verify(token, JWT_SECRET, (err) => {
		if (err) {
			res.status(403).json({
				success: false,
				message:  err.message,
			});
		} else {
			next();
		}
	});
};