import { fieldSizeMessage, requiredMessage } from '@/helpers/ErrorMessages'
import { body } from 'express-validator'
import { AuthenticatedUserRequest } from './AuthRequest'

export const AddDefinitionRequest = [
  ...AuthenticatedUserRequest,
  body('term')
    .notEmpty().withMessage(requiredMessage).bail()
    .isLength({ min: 2 }).withMessage(fieldSizeMessage(2)),
  body('answer')
    .notEmpty().withMessage(requiredMessage).bail()
    .isLength({ min: 5 }).withMessage(fieldSizeMessage(5))
]

export const UpdateDefinitionRequest = [
  body('term')
    .notEmpty().withMessage(requiredMessage).bail()
    .isLength({ min: 2 }).withMessage(fieldSizeMessage(2)),
  body('answer')
    .notEmpty().withMessage(requiredMessage).bail()
    .isLength({ min: 5 }).withMessage(fieldSizeMessage(5))
]
