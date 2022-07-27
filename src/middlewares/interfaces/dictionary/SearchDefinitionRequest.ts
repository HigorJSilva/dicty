import { Request } from '../../helpers/Request'

export interface SearchDefinitionRequest extends Request {
  search: string
}
