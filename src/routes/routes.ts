import express from 'express'
import { dictionaryRoutes } from './DictionaryRoutes'
import { userRoutes } from './UserRoutes'

const routes = express.Router()

routes.use('/users', userRoutes)
routes.use('/dictionary', dictionaryRoutes)

export { routes }
