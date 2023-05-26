import { schema } from "../utils/validate";
import { NextFunction, Request, Response } from "express";


export const validateBody = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validateAsync(req.body);
        next();
      } catch (error) {
        res.status(400).json({ error: "body validate error"  });
      }
};