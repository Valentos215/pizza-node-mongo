import STATUS_CODES from "../config/statusCodes";
import { Error } from "mongoose";
import { Response } from "express";

export const errorHandler = (res: Response, err: Error) => {
  res.status(STATUS_CODES.SERVER_ERROR_500).json({
    success: false,
    message: err.message ? err.message : err,
  });
};
