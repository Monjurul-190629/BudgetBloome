import { AppError } from "../utils/ApiError";


export const errorHandler = (err: any, req: any, res: any, next: any) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};