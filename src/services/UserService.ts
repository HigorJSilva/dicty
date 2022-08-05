import { LoginRequest } from '@/middlewares/interfaces/user/LoginRequest'
import { RegisterUserRequest } from '@/middlewares/interfaces/user/RegisterUserRequest'
import User, { ProtectedUserModel, UserModel } from '@/models/UserModel'
import env from '@/config/env'
import bcrypt, { compareSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { resourceNotFound } from '@/helpers/ErrorMessages'
import { ValidationError } from '@/helpers/ValidationError'

export async function store (userData: RegisterUserRequest): Promise<ProtectedUserModel> {
  const hashedPassword = bcrypt.hashSync(userData.password, 12)
  Object.assign(userData, { password: hashedPassword })
  const newUser: UserModel = await User.create(userData)
  const { password, role, ...protectedUser } = newUser._doc

  return protectedUser
}

export async function authenticate (loginData: LoginRequest): Promise<{ user: ProtectedUserModel, token: string } | Error> {
  const user = await User.findOne({ email: loginData.email })

  if (!user) {
    throw resourceNotFound('Email')
  }

  if (!compareSync(loginData.password, user.password)) {
    throw new ValidationError('Invalid Credentials')
  }
  const { password, role, ...protectedUser } = user._doc
  const token = jwt.sign(protectedUser, env.jwtSecret)

  return { user: protectedUser, token }
}
