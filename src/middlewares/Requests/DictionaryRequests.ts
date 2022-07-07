import { fieldSizeMessage, requiredMessage } from '@/helpers/ErrorMessages'
import { Term } from '@/models/DictionaryModel'
import { body, param } from 'express-validator'
import { AuthenticatedUserRequest } from './AuthRequest'
import { exists } from './customRules/exists'

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
  ...AuthenticatedUserRequest,
  ...AddDefinitionRequest,
  param('termId')
    .notEmpty().withMessage(requiredMessage).bail()
    .isMongoId()
    .custom(async (value: string) => await exists(value, Term, '_id'))
]

export const DeleteDefinitionRequest = [
  ...AuthenticatedUserRequest,
  param('termId')
    .notEmpty().withMessage(requiredMessage).bail()
    .isMongoId()
    .custom(async (value: string) => await exists(value, Term, '_id'))
]
