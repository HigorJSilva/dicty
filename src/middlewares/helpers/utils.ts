import { Request } from 'express'
import { matchedData } from 'express-validator'

export function getFilteredRequest (req: Request): any {
  return matchedData(req, {
    includeOptionals: true
  })
}
