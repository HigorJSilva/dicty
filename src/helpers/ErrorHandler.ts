import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { Request, Response, NextFunction } from 'express'
export = errorHandler

function errorHandler (err: TypeError, req: Request, res: Response, next: NextFunction): void {
  if (err.name === 'UnauthorizedError') {
    res.status(403).json(
      ApiResponse(
        false,
        'User not authorized',
        null,
        null
      )
    )
    return
  }

  if (err.name === 'UnauthenticatedError') {
    res.status(401).json(
      ApiResponse(
        false,
        'User not authenticated',
        null,
        null
      )
    )
    return
  }

  next()
}
