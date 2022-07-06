import { LoginRequest } from '@/middlewares/interfaces/user/LoginRequest'
import { RegisterUserRequest } from '@/middlewares/interfaces/user/RegisterUserRequest'
import User, { ProtectedUserModel, UserModel } from '@/models/UserModel'
import env from '@/config/env'
import bcrypt, { compareSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { resourceNotFound, ValidationError } from '@/helpers/ErrorMessages'

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

export async function authenticate (loginData: LoginRequest): Promise< {user: ProtectedUserModel, token: string} | Error> {
  try {
    const user = await User.findOne({ where: { email: loginData.email } })

    if (!user) {
      throw resourceNotFound('Email')
    }

    if (!compareSync(loginData.password, user.password)) {
      throw new ValidationError('Invalid Credentials')
    }
    const { password, role, ...protectedUser } = user._doc
    const token = jwt.sign(protectedUser, env.jwtSecret)

    return { user: protectedUser, token }
  } catch (error) {
    const err = error as Error
    if (err.name === 'ValidationError') {
      return new Error(err.message)
    }
    throw new Error((error as Error).message)
  }
}
