import { AddDefinitionRequest } from '@/middlewares/interfaces/AddDefinitionRequest'
import { Answer, DictionaryModel, Term } from '@/models/DictionaryModel'

export async function store (dictionaryData: AddDefinitionRequest): Promise<DictionaryModel> {
  const newTerm = await Term.create({ title: dictionaryData.term })
  const newAnswer = await Answer.create({ answer: dictionaryData.answer, termId: newTerm._doc._id })

  return {
    term: newTerm._doc,
    answers: [newAnswer._doc]
  }
}
