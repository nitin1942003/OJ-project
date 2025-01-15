import express from 'express'
import save from '../controllers/save.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, save)

export { router as saveRouter }