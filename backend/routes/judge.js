import express from 'express'
import judge from '../controllers/judge.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
console.log("here in judge router")
router.post('/', authMiddleware, judge)

export { router as judgeRouter }