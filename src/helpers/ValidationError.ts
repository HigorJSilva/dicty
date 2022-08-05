import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { Response } from 'express'

export class ValidationError extends Error {
  constructor (resource: string, public readonly validation: any[] | null = null) {
    super()
    this.name = 'ValidationError'
    this.message = resource
  }
}

export default function makeValidationErrorResponse (response: Response, err: ValidationError): Response {
  return response.status(422).json(
    ApiResponse(
      false,
      err.message,
      null,
      err.validation
    )
  )
};
