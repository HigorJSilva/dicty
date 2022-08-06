import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import Error from '@/models/ErrorModel'
import { Response } from 'express'

export default function makeInternalErrorResponse (response: Response, err: Error): Response {
  void Error.create({
    stack: err.stack ?? '',
    date: Intl.DateTimeFormat().resolvedOptions().timeZone
  })
  return response.status(500).json(
    ApiResponse(
      false,
      'Internal server Error',
      null,
      null
    )
  )
};
