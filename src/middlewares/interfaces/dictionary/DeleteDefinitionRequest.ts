import { Types } from 'mongoose'
import { Request } from '../../helpers/Request'

export interface DeleteDefinitionRequest extends Request {
  termId: Types.ObjectId
}
