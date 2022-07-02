import mongoose from 'mongoose'
import env from './env'

const url = env.mongoUrl

export class MongoDB {
  database: any

  constructor () {
    mongoose.connect(url
    ).then(() => {
      console.log('MongoDB is running at ' + url)
    }).catch((err: Error) => {
      console.error(err)
    })
  }
}
