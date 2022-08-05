import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { Response } from 'express'

export class UnauthenticatedError extends Error {
  constructor () {
    super()
    this.name = 'UnauthenticatedError'
  }
}

export default function makeUnauthenticatedErrorResponse (response: Response): Response {
  return response.status(401).json(
    ApiResponse(
      false,
      'User not authenticated',
      null,
      null
    )
  )
};
