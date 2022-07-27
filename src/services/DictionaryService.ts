import { resourceNotFound } from '@/helpers/ErrorMessages'
import { AddDefinitionRequest } from '@/middlewares/interfaces/dictionary/AddDefinitionRequest'
import { DeleteDefinitionRequest } from '@/middlewares/interfaces/dictionary/DeleteDefinitionRequest'
import { UpdateDefinitionRequest } from '@/middlewares/interfaces/dictionary/UpdateDefinitionRequest'
import { UserAnswerRequest } from '@/middlewares/interfaces/dictionary/UserAnswerRequest'
import { UserDefinitonApprovalRequest } from '@/middlewares/interfaces/dictionary/UserDefinitionApprovalRequest'
import { UserDefinitonRequest } from '@/middlewares/interfaces/dictionary/UserDefinitionRequest'
import { Answer, DictionaryModel, Term } from '@/models/DictionaryModel'
import { Downvote, Upvote } from '@/models/UpVoteModel'
import { ObjectId } from 'mongoose'

export async function list (): Promise<DictionaryModel[]> {
  return await Term.aggregate([
    {
      $match: {
        $or: [{
          isApproved: true
        },
        {
          isApproved: null
        }]
      }
    },
    {
      $lookup: {
        from: 'answers',
        foreignField: 'termId',
        localField: '_id',
        as: 'result'
      }
    },
    {
      $project: {
        _id: '$_id',
        title: '$title',
        answers: {
          $filter: {
            input: '$result',
            as: 'item',
            cond: {
              $ne: [
                '$$item.isApproved',
                false
              ]
            }
          }
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'answers.userId',
        foreignField: '_id',
        as: 'result'
      }
    },
    {
      $project: {
        _id: '$_id',
        title: '$title',
        answers: {
          $map: {
            input: '$answers',
            as: 'a',
            in: {
              $mergeObjects: [
                '$$a',
                {
                  $arrayElemAt: [{
                    $map: {
                      input: {
                        $filter: {
                          input: '$result',
                          cond: {
                            $eq: [
                              '$$a.userId',
                              '$$this._id'
                            ]
                          }
                        }
                      },
                      in: {
                        username: '$$this.username'
                      }
                    }
                  },
                  0
                  ]
                }
              ]
            }
          }
        }
      }
    },
    {
      $unset: [
        'answers.termId',
        'answers.userId',
        'answers.__v',
        'answers.isApproved'
      ]
    }
  ])
}

export async function store (dictionaryData: AddDefinitionRequest): Promise<DictionaryModel> {
  const newTerm = await Term.create({ title: dictionaryData.term })
  const newAnswer = await Answer.create({ answer: dictionaryData.answer, termId: newTerm._doc._id })
  await createUpvoteDownvoteSchema(newAnswer._doc._id as unknown as ObjectId)

  return {
    term: newTerm._doc,
    answers: [newAnswer._doc]
  }
}

export async function update (dictionaryData: UpdateDefinitionRequest): Promise<DictionaryModel> {
  const termToUpdate = await Term.findOneAndUpdate({ _id: dictionaryData.termId }, { title: dictionaryData.term }, {
    new: true
  })

  const updatedAnswer = await Answer.findOneAndUpdate({ termId: dictionaryData.termId, userId: null }, { answer: dictionaryData.answer }, {
    new: true
  })

  if (!termToUpdate) {
    throw new Error('UpdateDefinitionRequest failed exists for Term id')
  }

  if (!updatedAnswer) {
    throw new Error('UpdateDefinitionRequest failed exists for Term id or no default answer found')
  }

  return {
    term: termToUpdate._doc,
    answers: [updatedAnswer._doc]
  }
}

export async function remove (dictionaryData: DeleteDefinitionRequest): Promise<boolean> {
  await Answer.deleteMany({ termId: dictionaryData.termId })
  await Term.findOneAndDelete(dictionaryData.termId)
  return true
}

export async function userAnswer (dictionaryData: UserAnswerRequest): Promise<DictionaryModel> {
  const term = await Term.findOne({ _id: dictionaryData.termId }) as { _id: string, title: string }
  const newAnswer = await Answer.create({ answer: dictionaryData.answer, termId: dictionaryData.termId, userId: dictionaryData.userId })

  return {
    term,
    answers: [newAnswer._doc]
  }
}

export async function userDefiniton (dictionaryData: UserDefinitonRequest): Promise<DictionaryModel> {
  const newTerm = await Term.create({
    title: dictionaryData.term,
    userId: dictionaryData.userId,
    isApproved: false
  })

  const newAnswer = await Answer.create({
    answer: dictionaryData.answer,
    termId: newTerm._doc._id,
    userId: dictionaryData.userId,
    isApproved: false
  })

  return {
    term: newTerm._doc,
    answers: [newAnswer._doc]
  }
}

export async function userDefinitonApproval (approvalData: UserDefinitonApprovalRequest): Promise<void> {
  if (approvalData.approval) {
    await approveUserDefinition(approvalData.termId as unknown as ObjectId)
  } else {
    await declineUserDefinition(approvalData.termId as unknown as ObjectId)
  }
}

async function approveUserDefinition (termId: ObjectId): Promise<void> {
  await Term.findByIdAndUpdate({
    _id: termId
  }, {
    isApproved: true
  })

  const answer = await Answer.findOne({ termId: termId }, '_id')
  if (!answer) {
    throw resourceNotFound('Answer')
  }
  await approveUserAnswer(answer._id as unknown as ObjectId)
}

export async function approveUserAnswer (answerId: ObjectId): Promise<void> {
  await Answer.findByIdAndUpdate({
    _id: answerId
  }, {
    isApproved: true
  })
  await createUpvoteDownvoteSchema(answerId)
}

async function declineUserDefinition (termId: ObjectId): Promise<void> {
  await Term.findByIdAndDelete(termId)
  const answer = await Answer.findOne({ termId: termId }, '_id')

  if (!answer) {
    throw resourceNotFound('Answer')
  }
  await declineUserAnswer(answer._id as unknown as ObjectId)
}

export async function declineUserAnswer (answerId: ObjectId): Promise<void> {
  await Answer.findByIdAndDelete(answerId)
}

async function createUpvoteDownvoteSchema (answerId: ObjectId): Promise<void> {
  const answer = await Answer.findById(answerId)

  if (!answer) {
    throw resourceNotFound('Answer')
  }

  await Upvote.create({ answerId })
  await Downvote.create({ answerId })
}
