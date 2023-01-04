import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import env from '@/config/env'
import User, { UserModel } from '@/models/UserModel'
import { JwtInterface } from './interfaces/user/jwtInterface'
import { UnauthorizedError } from '@/helpers/UnauthorizedError'
import { UnauthenticatedError } from '@/helpers/UnauthenticatedError'

export function authorize (roles: string[] | string = []): any {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return [
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization as string

      if (!token) {
        next(new UnauthenticatedError())
        return
      }

      const decodedToken = jwt.verify(token.split(' ')[1], env.jwtSecret) as JwtInterface
      const user: UserModel | null = await User.findById(decodedToken._id)

      if (!user) {
        next(new UnauthenticatedError())
        return
      }
      req.params.userId = user.id

      if (roles.length && !roles.includes(user.role)) {
        next(new UnauthorizedError())
        return
      }
      next()
    }
  ]
}
