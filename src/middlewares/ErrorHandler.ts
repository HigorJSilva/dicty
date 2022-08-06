import makeInternalErrorResponse from '@/helpers/InternalError'
import makeUnauthenticatedErrorResponse from '@/helpers/UnauthenticatedError'
import makeUnauthorizedErrorResponse from '@/helpers/UnauthorizedError'
import makeValidationErrorResponse, { ValidationError } from '@/helpers/ValidationError'
import { NextFunction, Request, Response } from 'express'

export function errorHandler (error: Error, _request: Request, response: Response, _next: NextFunction
): typeof response {
  switch (error.name) {
    case 'UnauthorizedError':
      return makeUnauthorizedErrorResponse(response)

    case 'UnauthenticatedError':
      return makeUnauthenticatedErrorResponse(response)

    case 'ValidationError':
      return makeValidationErrorResponse(response, error as ValidationError)

    default:
      return makeInternalErrorResponse(response, error)
  }
}
