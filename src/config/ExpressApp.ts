import express from 'express'
import cors from 'cors'
import { routes } from '../routes/routes'
import env from './env'
import { errorHandler } from '@/middlewares/ErrorHandler'

const application = express()

application.use(express.json())
application.use(cors())

application.use(routes)

application.use(errorHandler)

application.set('port', env.port)

export { application }
