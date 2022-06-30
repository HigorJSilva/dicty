import { requiredMessage } from '@/helpers/ErrorMessages'
import { body } from 'express-validator'

export const RegisterUserRequest = [
  body('username')
    .notEmpty().withMessage(requiredMessage).bail(),
  body('email')
    .notEmpty().withMessage(requiredMessage).bail(),
  body('password')
    .notEmpty().withMessage(requiredMessage).bail()
]
