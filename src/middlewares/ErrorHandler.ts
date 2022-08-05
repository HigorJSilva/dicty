import makeUnauthenticatedErrorResponse from '@/helpers/UnauthenticatedError'
import makeUnauthorizedErrorResponse from '@/helpers/UnauthorizedError'
import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { NextFunction, Request, Response } from 'express'

export function errorHandler (error: Error, _request: Request, response: Response, _next: NextFunction
): typeof response {
  switch (error.name) {
    case 'UnauthorizedError':
      return makeUnauthorizedErrorResponse(response)

    case 'UnauthenticatedError':
      return makeUnauthenticatedErrorResponse(response)

    case 'ValidationError':
      return response.status(422).json(
        ApiResponse(
          false,
          error.message,
          null,
          null
        )
      )

    default:
      return response.status(500).json(
        ApiResponse(
          false,
          'Internal server error',
          null,
          null
        )
      )
  }
}
