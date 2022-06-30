import express from 'express'
import cors from 'cors'
import { routes } from '../routes/routes'
import errorHandler from '@/helpers/ErrorHandler'

const application = express()

application.use(express.json())
application.use(cors())

application.use(routes)

application.use(errorHandler)

application.set('port', 5000)

export { application }
