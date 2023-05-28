import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./error-handle";

describe("errorHandler", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should set the status code to 500 and send the error message as JSON", () => {
    const mockError = new Error("Test error");
    errorHandler(mockError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: mockError });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should call the next middleware if headers have already been sent", () => {
    mockResponse.headersSent = true;
    const mockError = new Error("Test error");
    errorHandler(mockError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockError);
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
