import express from 'express'
import { dictionaryRoutes } from './DictionaryRoutes'
import { userRoutes } from './UserRoutes'
import { votingRoutes } from './VotingRoutes'

const routes = express.Router()

routes.use('/users', userRoutes)
routes.use('/dictionary', dictionaryRoutes)
routes.use('/', votingRoutes)

export { routes }
