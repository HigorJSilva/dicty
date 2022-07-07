import { authorize } from '@/middlewares/Auth'
import { AddDefinitionRequest, DeleteDefinitionRequest, UpdateDefinitionRequest } from '@/middlewares/Requests/DictionaryRequests'
import { validateRequest } from '@/middlewares/ValidateRequest'
import express from 'express'
import { store, list, update, remove } from '../controllers/DictionaryController'

const router = express.Router()

router.get('/', authorize(), list)
router.post('/', authorize('admin'), AddDefinitionRequest, validateRequest, store)
router.put('/:termId', authorize('admin'), UpdateDefinitionRequest, validateRequest, update)
router.delete('/:termId', authorize('admin'), DeleteDefinitionRequest, validateRequest, remove)

export { router as dictionaryRoutes }
