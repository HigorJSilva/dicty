import * as mongoose from 'mongoose'
import { DocumentResult } from './MongooseDocumentModel'

export interface UserModel extends DocumentResult<UserModel> {
  id: string
  username: string
  email: string
  password: string
  role: string
};

export interface ProtectedUserModel {
  id: string
  username: string
  email: string
};

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }
})

const User = mongoose.model<UserModel>('User', UserSchema)
export default User
