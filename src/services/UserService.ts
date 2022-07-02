import { RegisterUserRequest } from '@/middlewares/interfaces/RegisterUserRequest'
import User, { ProtectedUserModel, UserModel } from '@/models/UserModel'
import bcrypt from 'bcrypt'

export async function store (userData: RegisterUserRequest): Promise<ProtectedUserModel> {
  try {
    const hashedPassword = bcrypt.hashSync(userData.password, 12)
    Object.assign(userData, { password: hashedPassword })
    const newUser: UserModel = await User.create(userData)
    const { password, role, ...protectedUser } = newUser._doc

    return protectedUser
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
