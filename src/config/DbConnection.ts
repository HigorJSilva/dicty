import mongoose from 'mongoose'

const url = 'mongodb://mongo:27017/dicty'

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
