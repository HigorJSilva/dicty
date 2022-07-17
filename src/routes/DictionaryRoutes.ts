import { authorize } from '@/middlewares/Auth'
import { AddDefinitionRequest, ApproveUserTermRequest, DeleteDefinitionRequest, UpdateDefinitionRequest, UserAnswerRequest } from '@/middlewares/Requests/DictionaryRequests'
import { validateRequest } from '@/middlewares/ValidateRequest'
import express from 'express'
import { store, list, update, remove, userAnswer, userDefiniton, userDefinitonApproval } from '../controllers/DictionaryController'

const router = express.Router()

router.get('/', authorize(), list)
router.post('/', authorize('admin'), AddDefinitionRequest, validateRequest, store)
router.put('/:termId', authorize('admin'), UpdateDefinitionRequest, validateRequest, update)
router.delete('/:termId', authorize('admin'), DeleteDefinitionRequest, validateRequest, remove)

router.post('/user-answer/:termId', authorize(), UserAnswerRequest, validateRequest, userAnswer)
router.post('/user-definition/', authorize(), AddDefinitionRequest, validateRequest, userDefiniton)
router.post('/approve-term/:termId', authorize('admin'), ApproveUserTermRequest, validateRequest, userDefinitonApproval)

export { router as dictionaryRoutes }
