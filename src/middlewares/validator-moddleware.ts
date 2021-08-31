import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleRequestErrors = (
  rq: Request, 
  rs: Response, 
  next: NextFunction
): void => {
  const errors = validationResult(rq);
  if (errors.isEmpty()) {
    next();
  } else {
    rs.status(400).send(errors.array());
  }
}
