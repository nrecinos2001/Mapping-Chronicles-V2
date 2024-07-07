/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import express from 'express';
import { NextFunction, Request, Response } from "express";
/* express configuration */
//const express = require('express');
import morgan from 'morgan'; // middleware
import path from 'path';
//const rateLimit = require('express-rate-limit');
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
//const hpp = require('hpp');
import cors from 'cors';
import { AppError } from '@Utils/index';
import { errorHandler as globalErrorHandler } from '@Controllers/index';
import { userRouter, pinRouter, layerRouter } from '@Routes/index';
export const app = express();

// set template engines
//app.set('view engine', 'pug');
//app.set('views', path.join(__dirname, 'views'));
// Enable CORS
app.use(cors());

//app.use(helmet()); // set security HTTP headers

/* middleware */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // also logs to console besides being a middleware
}

app.use(express.json());

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use(express.static(`${__dirname}/public`)); // public serves a root directory so 'public' is not needed on the urls
//app.use(express.static(`${__dirname}/public/html`)); // public serves a root directory so 'public' is not needed on the urls

// mount routes here
app.use('/api/users', userRouter);
app.use('/api/pins', pinRouter);
app.use("/api/layers", layerRouter);
// handle unhandled endpoints
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

// prevent from xss
//app.use(xss());

//module.exports = app;
