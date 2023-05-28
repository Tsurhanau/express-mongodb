import { schema } from "../utils/validate";
import { NextFunction, Request, Response } from "express";
import { validateBody } from "./validate-body";

jest.mock("../utils/validate", () => ({
  schema: {
    validateAsync: jest.fn(),
  },
}));

describe("validateBody", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: 'test',
        age: 20,
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the next middleware if the body is valid", async () => {
    (schema.validateAsync as jest.Mock).mockResolvedValue(Promise.resolve());

    await validateBody(mockRequest as Request, mockResponse as Response, mockNext);

    expect(schema.validateAsync).toHaveBeenCalledWith(mockRequest.body);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it("should send a 400 error response if the body is invalid", async () => {
    const mockValidationError = new Error("Body validation error");
    (schema.validateAsync as jest.Mock).mockRejectedValue(mockValidationError);

    await validateBody(mockRequest as Request, mockResponse as Response, mockNext);

    expect(schema.validateAsync).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "body validate error" });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
