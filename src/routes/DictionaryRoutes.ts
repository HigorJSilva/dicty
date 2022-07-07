import { authorize } from '@/middlewares/Auth'
import { AddDefinitionRequest, UpdateDefinitionRequest } from '@/middlewares/Requests/DictionaryRequests'
import { validateRequest } from '@/middlewares/ValidateRequest'
import express from 'express'
import { store, list, update } from '../controllers/DictionaryController'

const router = express.Router()

router.get('/list', authorize(), list)
router.post('/store', authorize('admin'), AddDefinitionRequest, validateRequest, store)
router.put('/:termId', authorize('admin'), UpdateDefinitionRequest, validateRequest, update)

export { router as dictionaryRoutes }
