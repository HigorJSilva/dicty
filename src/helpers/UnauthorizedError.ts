import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { Response } from 'express'

export class UnauthorizedError extends Error {
  constructor () {
    super()
    this.name = 'UnauthorizedError'
  }
}

export default function makeUnauthorizedErrorResponse (response: Response): Response {
  return response.status(403).json(
    ApiResponse(
      false,
      'User not authorized',
      null,
      null
    )
  )
};
