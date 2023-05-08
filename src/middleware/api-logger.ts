import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
	const log = `Method: [${req.method}] Url: [${req.url}] Params: [${JSON.stringify(req.body)}]`;
	logger.info(log);
	next();
};