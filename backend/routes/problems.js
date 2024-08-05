import express from 'express'
import { getProblems, getProblem, createProblem, updateProblem, deleteProblem } from '../controllers/problem.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

// Will add role-based access control middleware later

// Route to get all problems
router.get('/', authMiddleware, getProblems)

// Route to get a problem with a given id
router.get('/:id', authMiddleware, getProblem)

// Route to create a new problem
router.post('/', authMiddleware, createProblem)

// Route to update a problem
router.put('/:id', authMiddleware, updateProblem)

// Route to delete a problem
router.delete('/:id', authMiddleware, deleteProblem)

export { router as problemRouter }