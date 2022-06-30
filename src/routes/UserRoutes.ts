import { RegisterUserRequest } from '@/middlewares/Requests/UserRequests'
import { validateRequest } from '@/middlewares/ValidateRequest'
import express from 'express'
import { register } from '../controllers/UserController'

const router = express.Router()

router.post('/register', RegisterUserRequest, validateRequest, register)

export { router as userRoutes }
