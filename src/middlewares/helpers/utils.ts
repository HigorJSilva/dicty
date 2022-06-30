import { Request } from 'express'
import { matchedData } from 'express-validator'
import { Request as RequestModel } from './Request'

export function getFilteredRequest (req: Request): RequestModel {
  return matchedData(req, {
    includeOptionals: true
  }) as RequestModel
}
