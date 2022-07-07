import { Types } from 'mongoose'
import { Request } from '../../helpers/Request'

export interface UpdateDefinitionRequest extends Request {
  termId: Types.ObjectId
  term: string
  answer: string
}
