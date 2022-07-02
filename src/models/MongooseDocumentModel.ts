import mongoose from 'mongoose'

export interface DocumentResult<T> extends mongoose.Document{
  _doc: T
}
