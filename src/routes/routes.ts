import express from 'express'
import { userRoutes } from './UserRoutes'

const routes = express.Router()

routes.use('/users', userRoutes)

export { routes }
