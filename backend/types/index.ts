import { MongooseError } from "mongoose";

import { AppError } from "@Utils/appError"
import { Response } from "express";

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

// Controllers Response
export interface IResponseDynamicBuffer extends Response {
  body?: any; // TODO: Investigate which type it is
}