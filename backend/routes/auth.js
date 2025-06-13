import express from 'express'
import { register, login, logout, checkAuth, verifyEmail } from '../controllers/auth.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/checkAuth', authMiddleware, checkAuth)

// Add the email verification route
router.get('/:id/verify-email/:token', verifyEmail)

export { router as authRouter }