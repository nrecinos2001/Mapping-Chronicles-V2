import { Request, Response, NextFunction } from "express"

/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => { // review this definition later, this was coded this way to remove the repetitive try catch blocks
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
};
