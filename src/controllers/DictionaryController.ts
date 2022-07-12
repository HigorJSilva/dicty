import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { getFilteredRequest } from '@/middlewares/helpers/utils'
import { AddDefinitionRequest } from '@/middlewares/interfaces/dictionary/AddDefinitionRequest'
import { DeleteDefinitionRequest } from '@/middlewares/interfaces/dictionary/DeleteDefinitionRequest'
import { UpdateDefinitionRequest } from '@/middlewares/interfaces/dictionary/UpdateDefinitionRequest'
import { UserAnswerRequest } from '@/middlewares/interfaces/dictionary/UserAnswerRequest'
import { NextFunction, Request, Response } from 'express'
import * as DictionaryService from '../services/DictionaryService'

export async function store (req: Request, res: Response, next: NextFunction): Promise<Response | null> {
  const filteredRequest: AddDefinitionRequest = getFilteredRequest(req) as AddDefinitionRequest
  try {
    const dictionaryTerm = await DictionaryService.store(filteredRequest)

    return res.status(200).json(ApiResponse(true, null, dictionaryTerm, null))
  } catch (error) {
    return res.status(500).json(ApiResponse(false, 'InternalError', null, [(error as Error).stack] ?? ['']))
  }
}

export async function list (req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const dictionaryTerm = await DictionaryService.list()

    return res.status(200).json(ApiResponse(true, null, dictionaryTerm, null))
  } catch (error) {
    return res.status(500).json(ApiResponse(false, 'InternalError', null, [(error as Error).stack] ?? ['']))
  }
}

export async function update (req: Request, res: Response, next: NextFunction): Promise<Response | null> {
  const filteredRequest: UpdateDefinitionRequest = getFilteredRequest(req) as UpdateDefinitionRequest
  try {
    const dictionaryTerm = await DictionaryService.update(filteredRequest)

    return res.status(200).json(ApiResponse(true, null, dictionaryTerm, null))
  } catch (error) {
    return res.status(500).json(ApiResponse(false, 'InternalError', null, [(error as Error).stack] ?? ['']))
  }
}

export async function remove (req: Request, res: Response, next: NextFunction): Promise<Response | null> {
  const filteredRequest: DeleteDefinitionRequest = getFilteredRequest(req) as DeleteDefinitionRequest
  try {
    const ret = await DictionaryService.remove(filteredRequest)
    return res.status(200).json(ApiResponse(true, null, ret, null))
  } catch (error) {
    return res.status(500).json(ApiResponse(false, 'InternalError', null, [(error as Error).stack] ?? ['']))
  }
}

export async function userAnswer (req: Request, res: Response): Promise<Response | null> {
  const filteredRequest: UserAnswerRequest = getFilteredRequest(req) as UserAnswerRequest
  try {
    const userAnswer = await DictionaryService.userAnswer(filteredRequest)

    if (userAnswer instanceof Error) {
      return res.status(422).json(ApiResponse(false, userAnswer.message, null, null))
    }

    return res.status(200).json(ApiResponse(true, null, userAnswer, null))
  } catch (error) {
    const err = error as Error

    return res.status(500).json(ApiResponse(false, 'InternalError', null, [err.stack] ?? ['']))
  }
}
