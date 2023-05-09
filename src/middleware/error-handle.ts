import { NextFunction, Request, Response } from "express";

export const errorHandler = (
	err: Error,
	_: Request,
	res: Response,
	next: NextFunction,
) => {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500).json({error: err});
};