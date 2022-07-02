import { fieldSizeMessage, invalidEmailMessage, requiredMessage, uniqueMessage } from '@/helpers/ErrorMessages'
import User from '@/models/UserModel'
import { body } from 'express-validator'
import { unique } from './customRules/unique'

export const RegisterUserRequest = [
  body('username')
    .notEmpty().withMessage(requiredMessage).bail()
    .isLength({ min: 5, max: 25 }).withMessage(fieldSizeMessage(5, 25)),
  body('email')
    .notEmpty().withMessage(requiredMessage).bail()
    .normalizeEmail()
    .isEmail().withMessage(invalidEmailMessage)
    .custom(async (value: string) => await unique(value, 'email', User)).withMessage(uniqueMessage('Email')),
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
