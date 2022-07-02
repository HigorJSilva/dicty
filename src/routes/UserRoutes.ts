import { LoginRequest, RegisterUserRequest } from '@/middlewares/Requests/UserRequests'
import { validateRequest } from '@/middlewares/ValidateRequest'
import express from 'express'
import { auth, register } from '../controllers/UserController'

const router = express.Router()

router.post('/register', RegisterUserRequest, validateRequest, register)
router.post('/login', LoginRequest, validateRequest, auth)

export { router as userRoutes }
