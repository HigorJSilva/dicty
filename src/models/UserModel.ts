import * as mongoose from 'mongoose'

export interface UserModel extends mongoose.Document {
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
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

const User = mongoose.model<UserModel>('User', UserSchema)
export default User
