import { AddDefinitionRequest } from '@/middlewares/Requests/DictionaryRequests'
import { validateRequest } from '@/middlewares/ValidateRequest'
import express from 'express'
import { store } from '../controllers/DictionaryController'

const router = express.Router()

router.post('/store', AddDefinitionRequest, validateRequest, store)

export { router as dictionaryRoutes }
