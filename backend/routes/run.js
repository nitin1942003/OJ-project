import express from 'express'
import run from '../controllers/run.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, run)

export { router as runRouter }