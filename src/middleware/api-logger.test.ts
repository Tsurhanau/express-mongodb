import { Request, Response, NextFunction } from "express";
import { apiLogger } from "./api-logger";
import { logger } from "./logger";

describe("API Logger Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock<NextFunction>;

  beforeEach(() => {
    req = {
      method: "GET",
      url: "/api/users",
      body: { key: "value" },
    };
    res = {};
    next = jest.fn();
    logger.info = jest.fn();
  });

  it("should log the request details and call next", () => {
    apiLogger(req as Request, res as Response, next);

    const log = `Method: [GET] Url: [/api/users] Params: [{"key":"value"}]`;
    expect(logger.info).toHaveBeenCalledWith(log);
    expect(next).toHaveBeenCalled();
  });
});
