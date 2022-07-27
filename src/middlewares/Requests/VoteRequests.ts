import { requiredMessage } from '@/helpers/ErrorMessages'
import { Answer } from '@/models/DictionaryModel'
import { param } from 'express-validator'
import { AuthenticatedUserRequest } from './AuthRequest'
import { exists } from './customRules/exists'

export const VoteRequest = [
  ...AuthenticatedUserRequest,
  param('answerId')
    .notEmpty().withMessage(requiredMessage).bail()
    .isMongoId()
    .custom(async (value: string) => await exists(value, Answer, '_id'))
]
