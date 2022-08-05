import { VoteRequest } from '@/middlewares/interfaces/dictionary/VoteRequest'
import { Answer } from '@/models/DictionaryModel'
import { Upvote, Downvote, voteModel } from '@/models/UpVoteModel'
import { ObjectId } from 'mongoose'

export async function upvote (votingData: VoteRequest): Promise<boolean> {
  let oneVote: voteModel | null = await Upvote.findOne({ answerId: votingData.answerId })
  const options = { upsert: true, new: true, setDefaultsOnInsert: true }

  if (oneVote) {
    oneVote = oneVote._doc
  }

  if (oneVote?.votes.filter((user: ObjectId) => votingData.userId).length === 1) {
    await Answer.updateOne({
      _id: votingData.answerId
    },
    {
      $inc: { voteCount: -1 }
    })

    await Upvote.updateOne({
      answerId: votingData.answerId
    },
    {
      $pull: {
        votes: { userId: votingData.userId }
      }
    },
    options
    )
  } else if (oneVote?.votes.filter((user: ObjectId) => votingData.userId).length === 0) {
    await Upvote.findOneAndUpdate({
      answerId: votingData.answerId,
      'votes.userId': { $ne: votingData.userId }
    },
    {
      $push: {
        // @ts-expect-error
        votes: { userId: votingData.userId }
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false }
    )

    const downvote: voteModel | null = await Downvote.findOne({ answerId: votingData.answerId })

    // @ts-expect-error
    if (downvote?.votes.filter((user: ObjectId) => votingData.userId).length > 0) {
      await Downvote.updateOne({
        answerId: votingData.answerId
      },
      {
        $pull: {
          votes: { userId: votingData.userId }
        }
      },
      options
      )

      await Answer.updateOne({
        _id: votingData.answerId
      },
      {
        $inc: { voteCount: 2 }
      })
    } else {
      await Answer.updateOne({
        _id: votingData.answerId
      },
      { $inc: { voteCount: 1 } },
      options
      )
    }
  }

  return true
}

export async function downvote (votingData: VoteRequest): Promise<boolean> {
  let oneVote: voteModel | null = await Downvote.findOne({ answerId: votingData.answerId })
  const options = { upsert: true, new: true, setDefaultsOnInsert: true }

  if (oneVote) {
    oneVote = oneVote._doc
  }

  if (oneVote?.votes.filter(user => votingData.userId).length === 1) {
    await Answer.updateOne({
      _id: votingData.answerId
    },
    { $inc: { voteCount: 1 } }
    )

    await Downvote.updateOne({
      answerId: votingData.answerId
    },
    {
      $pull: {
        votes: { userId: votingData.userId }
      }
    },
    options
    )
  } else if (oneVote?.votes.filter(user => votingData.userId).length === 0) {
    await Downvote.findOneAndUpdate({
      answerId: votingData.answerId,
      'votes.userId': { $ne: votingData.userId }
    },
    {
      $push: {
        // @ts-expect-error
        votes: { userId: votingData.userId }
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false }
    )
    const upvote: voteModel | null = await Upvote.findOne({ answerId: votingData.answerId })

    // @ts-expect-error
    if (upvote?.votes.filter(() => votingData.userId).length > 0) {
      await Upvote.updateOne({
        answerId: votingData.answerId
      },
      {
        $pull: {
          votes: { userId: votingData.userId }
        }
      },
      options
      )

      await Answer.updateOne({
        _id: votingData.answerId
      },
      { $inc: { voteCount: -2 } }
      )
    } else {
      await Answer.updateOne({
        _id: votingData.answerId
      },
      { $inc: { voteCount: -1 } },
      options
      )
    }
  }

  return true
}
