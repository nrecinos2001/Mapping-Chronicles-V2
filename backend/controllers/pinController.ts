import { Request, Response } from "express";

/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const Pin = require('../models/Pin');
import { catchAsync } from '@Utils/index';

// create a pin
export const postPin = catchAsync(async (req: Request, res: Response) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all pins

export const getPin = catchAsync(async (req: Request, res: Response) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (err) {
        res.status(500).json(err);
    }
});
