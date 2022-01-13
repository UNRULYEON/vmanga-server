import { Color, logger } from "@utils";
import { NextFunction, Request, Response } from "express";

import { ValidationErrorType } from "@middleware";

type ErrorType = "error" | "warning" | "notice";

export class MWError {
  type: ErrorType;
  message: string | ValidationErrorType[];
  code: number;
  stack?: string;

  constructor(type: ErrorType, message: string | any[], code: number = 500) {
    this.type = type;
    this.message = message;
    this.code = code;

    const native_error = new Error();
    this.stack = native_error.stack;
  }
}

export type RouteFunction = (error: MWError, req: Request, res: Response, next: NextFunction) => void;

export const error_middleware: RouteFunction = (error, req, res, next) => {
  const message: string = Array.isArray(error.message)
    ? `${Color["FgWhite"]}${Color["BgBlue"]}[${req.url}]${Color["Reset"]}
${Color["FgBlue"]}Message${Color["Reset"]} → ${JSON.stringify(error.message, null, 2)}${
        error.stack && process.env.NODE_ENV !== "production"
          ? `
${Color["FgBlue"]}Stack${Color["Reset"]} → ${error.stack}`
          : ""
      }`
    : `${Color["FgWhite"]}${Color["BgBlue"]}[${req.url}]${Color["Reset"]}
${Color["FgBlue"]}Message${Color["Reset"]} → ${error.message}${
        error.stack && process.env.NODE_ENV !== "production"
          ? `
${Color["FgBlue"]}Stack${Color["Reset"]} → ${error.stack}`
          : ""
      }`;

  logger.log(error.type, message);

  res.status(error.code).json({
    type: error.type,
    code: error.code,
    message: error.message,
  });
};

export default error_middleware;
