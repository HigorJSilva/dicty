import express from 'express'
import cors from 'cors'
import { routes } from '../routes/routes'
import errorHandler from '@/helpers/ErrorHandler'
import env from './env'

const application = express()

application.use(express.json())
application.use(cors())

application.use(routes)

application.use(errorHandler)

application.set('port', env.port)

export { application }
