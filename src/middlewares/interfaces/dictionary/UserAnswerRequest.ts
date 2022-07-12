import { Types } from 'mongoose'
import { Request } from '../../helpers/Request'

export interface UserAnswerRequest extends Request {
  termId: Types.ObjectId
  userId: Types.ObjectId
  answer: string
}
