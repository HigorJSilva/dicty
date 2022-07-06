import { param } from 'express-validator'
import { requiredMessage } from '@/helpers/ErrorMessages'

export const AuthenticatedUserRequest = [
  param('userId').notEmpty().withMessage(requiredMessage).bail()
]
