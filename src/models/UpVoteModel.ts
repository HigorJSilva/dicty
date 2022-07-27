import mongoose, { Schema } from 'mongoose'
import { DocumentResult } from './MongooseDocumentModel'

export interface voteModel extends DocumentResult<voteModel>{
  answerId: string
  votes: Schema.Types.ObjectId[]
};

const UpvoteSchema = new Schema({
  answerId: {
    type: Schema.Types.ObjectId
  },
  votes: [{
    userId: {
      type: Schema.Types.ObjectId
    }
  }]
})

export const Upvote = mongoose.model<voteModel>('upvotes', UpvoteSchema)

const DownvoteSchema = new Schema({
  answerId: {
    type: Schema.Types.ObjectId
  },
  votes: [{
    userId: {
      type: Schema.Types.ObjectId
    }
  }]
})

export const Downvote = mongoose.model<voteModel>('downvotes', DownvoteSchema)
