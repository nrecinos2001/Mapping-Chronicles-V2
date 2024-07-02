/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import express from 'express';
const pinController = require('../controllers/pinController');

export const pinRouter = express.Router();

pinRouter.route('/').post(pinController.postPin).get(pinController.getPin);
