import express from 'express'
import { register, login, logout, checkAuth } from '../controllers/auth.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/checkAuth', authMiddleware, checkAuth)

export { router as authRouter }