import { Document, MongooseError } from "mongoose";

import { AppError } from "@Utils/appError"
import { Request, Response } from "express";
import { User } from "@Models/userModel";

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

export interface IRequestWithLoggedUser extends Request {
  user: {
    role: string,
  }; // TODO: Update type
}

// Token
export interface ITokenPayload {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export interface ILoginRequest extends Request {
  body: {
    email: string;
    password: string;
  }
}

// MAIL
export interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}


// SCHEMAS 
export enum RoleEnum {
  DRIVER = 'driver',
  STUDENT = 'student',
}
export interface IUserModel extends Document {
  username: string;
  email: string;
  password: string;
  active: boolean;
  role: 'driver' | 'student';
  correctPassword: (password: string, userPassword: string) => Boolean,
  changedPasswordAfter: (iat: number) => Boolean;
}
