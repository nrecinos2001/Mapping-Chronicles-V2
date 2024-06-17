import { MongooseError } from "mongoose";

import { AppError } from "@Utils/appError"

export interface IControllerError extends AppError {
  code?: number;
  path?: string;
  value?: string;
  errors?: MongooseError[]
  errmsg?: string;
}

export interface IValidationErrorDb {
  errors?: MongooseError[]
}

export interface ICastErrorDb {
  path?: string;
  value?: string;
}

export interface IDuplicateFieldsDb {
  errmsg?: string;
}