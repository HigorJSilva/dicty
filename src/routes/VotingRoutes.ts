import { authorize } from '@/middlewares/Auth'
import { VoteRequest } from '@/middlewares/Requests/VoteRequests'
import { validateRequest } from '@/middlewares/ValidateRequest'
import { upvote, downvote } from '../controllers/VotingController'
import express from 'express'

const router = express.Router()

router.get('/upvote/:answerId', authorize(), VoteRequest, validateRequest, upvote)
router.get('/downvote/:answerId', authorize(), VoteRequest, validateRequest, downvote)

export { router as votingRoutes }
