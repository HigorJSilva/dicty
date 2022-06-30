import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { getFilteredRequest } from '@/middlewares/helpers/utils'
import { RegisterUserRequest } from '@/middlewares/interfaces/RegisterUserRequest'
import { NextFunction, Request, Response } from 'express'
import * as UserService from '../services/UserService'

export async function register (req: Request, res: Response, next: NextFunction): Promise<Response | null> {
  const filteredRequest: RegisterUserRequest = getFilteredRequest(req) as RegisterUserRequest
  try {
    const userRegister = await UserService.store(filteredRequest)

    if (userRegister) {
      return res.status(200).json(ApiResponse(true, null, userRegister, null))
    }

    return res.status(422).json(ApiResponse(false, null, null, userRegister))
  } catch (error) {
    const err = error as Error
    if (err.name === 'ValidationError') {
      next(res.status(422).json(ApiResponse(false, null, null, [err.message] ?? [''])))
    }

    next(res.status(500).json(ApiResponse(false, err.stack ?? 'undefined Stack', null, null)))
    return null
  }
}
