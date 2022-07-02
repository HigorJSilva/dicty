import { fieldSizeMessage, invalidEmailMessage, requiredMessage } from '@/helpers/ErrorMessages'
import { body } from 'express-validator'

export const RegisterUserRequest = [
  body('username')
    .notEmpty().withMessage(requiredMessage).bail()
    .isLength({ min: 5, max: 25 }).withMessage(fieldSizeMessage(5, 25)),
  body('email')
    .notEmpty().withMessage(requiredMessage).bail()
    .normalizeEmail()
    .isEmail().withMessage(invalidEmailMessage),
  body('password')
    .notEmpty().withMessage(requiredMessage).bail()
    .isLength({ min: 5, max: 25 }).withMessage(fieldSizeMessage(5, 25))
]

export const LoginRequest = [
  body('email')
    .notEmpty().withMessage(requiredMessage).bail()
    .normalizeEmail()
    .isEmail().withMessage(invalidEmailMessage),
  body('password')
    .notEmpty().withMessage(requiredMessage).bail()
]
