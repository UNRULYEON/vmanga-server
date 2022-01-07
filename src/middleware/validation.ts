import { AnySchema, ValidationError } from "yup";
import { NextFunction, Request, Response } from "express";

import { MWError } from "@middlware";

export type ValidationErrorType = {
  field: string;
  message: string;
};

const validate_schema = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) =>
  schema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((e: ValidationError) => {
      let errors: ValidationErrorType[] = [];

      e.inner.map((error) => {
        errors.push({
          field: error.path,
          message: error.message,
        });
      });

      next(new MWError("error", errors, 400));
    });

export default validate_schema;
