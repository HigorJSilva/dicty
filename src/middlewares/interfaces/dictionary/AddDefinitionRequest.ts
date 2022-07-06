import { Request } from '../../helpers/Request'

export interface AddDefinitionRequest extends Request {
  term: string
  answer: string
}
