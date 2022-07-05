import { authorize } from '@/middlewares/Auth'
import { AddDefinitionRequest } from '@/middlewares/Requests/DictionaryRequests'
import { validateRequest } from '@/middlewares/ValidateRequest'
import express from 'express'
import { store } from '../controllers/DictionaryController'

const router = express.Router()

router.post('/store', authorize('admin'), AddDefinitionRequest, validateRequest, store)

export { router as dictionaryRoutes }
