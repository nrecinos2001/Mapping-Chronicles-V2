/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import express from 'express';
const authController = require('../controllers/authController');

export const userRouter = express.Router();

// only makes sense to post data on signup, that's why it has not been chained in the REST format below
userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);
