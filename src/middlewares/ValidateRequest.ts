import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { handleErrorMessage } from './helpers/HandleErrorMessages'
import { ApiResponse } from './helpers/HttpResponse'

export function validateRequest (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsArray = handleErrorMessage(errors.array())

    res.status(422).json(ApiResponse(false, 'Bad request', null, errorsArray))
    return
  }

  next()
}
