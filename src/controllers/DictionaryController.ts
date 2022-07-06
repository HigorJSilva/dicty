import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { getFilteredRequest } from '@/middlewares/helpers/utils'
import { AddDefinitionRequest } from '@/middlewares/interfaces/dictionary/AddDefinitionRequest'
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
