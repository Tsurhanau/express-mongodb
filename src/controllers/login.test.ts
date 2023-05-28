import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { login } from "./login";
import { JWT_SECRET, JWT_EXPIRATION_TIME_MS } from "../config";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("Login Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        password: "testpassword",
      },
    };
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should send JWT token if valid credentials are provided", () => {
    const mockToken = "mock-token";
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    login(req as Request, res as Response);

    expect(jwt.sign).toHaveBeenCalledWith(
      { username: "testuser" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION_TIME_MS }
    );
    expect(res.send).toHaveBeenCalledWith(mockToken);
  });

  it("should send 'invalid credentials' message if username or password is missing", () => {
    req.body = {};

    login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "invalid credentials" });
  });
});
