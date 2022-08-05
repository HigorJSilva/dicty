import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { Response } from 'express'

export class ValidationError extends Error {
  constructor (resource: string) {
    super()
    this.name = 'ValidationError'
    this.message = resource
  }
}

export default function makeValidationErrorResponse (response: Response, err: Error): any {
  return response.status(422).json(
    ApiResponse(
      false,
      null,
      null,
      [err.message] ?? ['']
    )
  )
};
