import { Types } from 'mongoose'

export interface UserDefinitonRequest extends Request {
  userId: Types.ObjectId
  term: string
  answer: string
}
