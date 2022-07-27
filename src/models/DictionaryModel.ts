import mongoose, { Types } from 'mongoose'
import { DocumentResult } from './MongooseDocumentModel'

export interface TermModel extends DocumentResult<TermModel> {
  _id: string
  title: string
}

export interface AnswerModel extends DocumentResult<AnswerModel>{
  _id: string
  answer: string
  userid?: string
  isApproved?: boolean
}

export interface DictionaryModel {
  term: {
    _id: string
    title: string
  }
  answers: AnswerModel[]
}

const TermSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: Types.ObjectId
  },
  isApproved: {
    type: Boolean
  }
})
export const Term = mongoose.model<TermModel>('Term', TermSchema)

const AnswerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  termId: {
    type: Types.ObjectId,
    required: true
  },
  userId: {
    type: Types.ObjectId
  },
  voteCount: {
    type: Number
  },
  votes: [{
    user: { type: Types.ObjectId }
  }],
  isApproved: {
    type: Boolean
  }
})
export const Answer = mongoose.model<AnswerModel>('Answer', AnswerSchema)
