import { AddDefinitionRequest } from '@/middlewares/interfaces/dictionary/AddDefinitionRequest'
import { Answer, DictionaryModel, Term } from '@/models/DictionaryModel'

export async function list (): Promise<DictionaryModel[]> {
  return await Answer.aggregate([
    {
      $group: {
        _id: '$termId',
        anwers: {
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
        answers: '$anwers'
      }
    }, {
      $unset: [
        'answers.termId', 'answers.__v'
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

export async function update (dictionaryData: AddDefinitionRequest): Promise<DictionaryModel> {
  const newTerm = await Term.create({ title: dictionaryData.term })
  const newAnswer = await Answer.create({ answer: dictionaryData.answer, termId: newTerm._doc._id })

  return {
    term: newTerm._doc,
    answers: [newAnswer._doc]
  }
}
