import { ApiResponse } from '@/middlewares/helpers/HttpResponse'
import { getFilteredRequest } from '@/middlewares/helpers/utils'
import { VoteRequest } from '@/middlewares/interfaces/dictionary/VoteRequest'
import { NextFunction, Request, Response } from 'express'
import * as VotingService from '../services/VotingService'

export async function upvote (req: Request, res: Response, next: NextFunction): Promise<Response | null> {
  const filteredRequest: VoteRequest = getFilteredRequest(req) as VoteRequest
  try {
    await VotingService.upvote(filteredRequest)

    return res.status(204).json(ApiResponse(true, null, null, null))
  } catch (error) {
    return res.status(500).json(ApiResponse(false, 'InternalError', null, [(error as Error).stack] ?? ['']))
  }
}

export async function downvote (req: Request, res: Response, next: NextFunction): Promise<Response> {
  const filteredRequest: VoteRequest = getFilteredRequest(req) as VoteRequest
  try {
    await VotingService.downvote(filteredRequest)

    return res.status(204).json(ApiResponse(true, null, null, null))
  } catch (error) {
    return res.status(500).json(ApiResponse(false, 'InternalError', null, [(error as Error).stack] ?? ['']))
  }
}
