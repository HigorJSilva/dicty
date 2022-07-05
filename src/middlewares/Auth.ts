import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import errorHandler from '../helpers/ErrorHandler'
import env from '@/config/env'
import User, { UserModel } from '@/models/UserModel'
import { JwtInterface } from './interfaces/jwtInterface'

export function authorize (roles: string[] | string = []): any {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return [
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization as string

      if (!token) {
        return errorHandler({ name: 'UnauthenticatedError', message: '' }, req, res, next)
      }

      const decodedToken = jwt.verify(token.split(' ')[1], env.jwtSecret) as JwtInterface
      const user: UserModel | null = await User.findById(decodedToken._id)

      if (!user) {
        return errorHandler({ name: 'UnauthenticatedError', message: '' }, req, res, next)
      }
      req.params.userId = user.id

      if (roles.length && !roles.includes(user.role)) {
        return errorHandler({ name: 'UnauthorizedError', message: '' }, req, res, next)
      }
      next()
    }
  ]
}
