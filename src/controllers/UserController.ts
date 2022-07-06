import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { getFilteredRequest } from '@/middlewares/helpers/utils'
import { LoginRequest } from '@/middlewares/interfaces/user/LoginRequest'
import { RegisterUserRequest } from '@/middlewares/interfaces/user/RegisterUserRequest'
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
      return res.status(422).json(ApiResponse(false, null, null, [err.message] ?? ['']))
    }

    return res.status(500).json(ApiResponse(false, 'InternalError', null, [err.stack] ?? ['']))
  }
}

export async function auth (req: Request, res: Response, next: NextFunction): Promise<Response | null> {
  const filteredRequest: LoginRequest = getFilteredRequest(req) as LoginRequest
  try {
    const userLogin = await UserService.authenticate(filteredRequest)

    if (userLogin instanceof Error) {
      return res.status(422).json(ApiResponse(false, userLogin.message, null, null))
    }

    return res.status(200).json(ApiResponse(true, null, userLogin, null))
  } catch (error) {
    const err = error as Error

    return res.status(500).json(ApiResponse(false, 'InternalError', null, [err.stack] ?? ['']))
  }
}
