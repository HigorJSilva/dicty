import { AddDefinitionRequest } from '@/middlewares/interfaces/dictionary/AddDefinitionRequest'
import { DeleteDefinitionRequest } from '@/middlewares/interfaces/dictionary/DeleteDefinitionRequest'
import { UpdateDefinitionRequest } from '@/middlewares/interfaces/dictionary/UpdateDefinitionRequest'
import { UserAnswerRequest } from '@/middlewares/interfaces/dictionary/UserAnswerRequest'
import { Answer, DictionaryModel, Term } from '@/models/DictionaryModel'

export async function list (): Promise<DictionaryModel[]> {
  return await Answer.aggregate([
    {
      $group: {
        _id: '$termId',
        answers: {
          $push: '$$ROOT'
        }
      }
    }, {
      $lookup: {
        from: 'terms',
        foreignField: '_id',
        localField: '_id',
        as: 'result'
      }
    }, {
      $project: {
        _id: '$_id',
        title: {
          $first: '$result.title'
        },
        answers: {
          $filter: {
            input: '$answers',
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
    }, {
      $unset: [
        'answers.termId',
        'answers.__v'
      ]
    }
  ])
}

export async function store (dictionaryData: AddDefinitionRequest): Promise<DictionaryModel> {
  const newTerm = await Term.create({ title: dictionaryData.term })
  const newAnswer = await Answer.create({ answer: dictionaryData.answer, termId: newTerm._doc._id })

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
