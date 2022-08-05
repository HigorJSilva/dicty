import { ValidationError } from '@/helpers/ValidationError'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { handleErrorMessage } from './helpers/HandleErrorMessages'

export function validateRequest (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsArray = handleErrorMessage(errors.array())

    next(new ValidationError('Bad Request', errorsArray))
    return
  }

  next()
}
