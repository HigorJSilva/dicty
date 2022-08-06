import mongoose from 'mongoose'
import { DocumentResult } from './MongooseDocumentModel'

export interface ErrorModel extends DocumentResult<ErrorModel> {
  stack: string
  date: Date
};

export const ErrorSchema = new mongoose.Schema({
  stack: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

const Error = mongoose.model<ErrorModel>('Error', ErrorSchema)
export default Error
