import { Request, Response, NextFunction } from "express";
import { checkAuthToken } from "./auth";
import { verify } from "jsonwebtoken";
import { JWT_HTTP_HEADER_KEY, JWT_SECRET } from "../config";

jest.mock("jsonwebtoken");

describe("checkAuthToken Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock<NextFunction>;

  beforeEach(() => {
    req = {
      headers: {
        [JWT_HTTP_HEADER_KEY]: "valid_token",
      },
    };
    res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    next = jest.fn();
    (verify as jest.Mock).mockImplementation((token, secret, callback) => {
      if (token === "valid_token") {
        callback(null);
      } else {
        callback(new Error("Invalid token"));
      }
    });
  });

  it("should call next if a valid token is provided", () => {
    checkAuthToken(req as Request, res as Response, next);

    expect(verify).toHaveBeenCalledWith("valid_token", JWT_SECRET, expect.any(Function));
    expect(next).toHaveBeenCalled();
  });

  it("should send an error response if no token is provided", () => {
    req = {
        headers: {},
    };

    checkAuthToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({ success: false, message: "No token provided." });
    expect(next).not.toHaveBeenCalled();
  });

  it("should send an error response if an invalid token is provided", () => {
    req.headers = {
        [JWT_HTTP_HEADER_KEY]: "invalid_token",
    };

    checkAuthToken(req as Request, res as Response, next);

    expect(verify).toHaveBeenCalledWith("invalid_token", JWT_SECRET, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
