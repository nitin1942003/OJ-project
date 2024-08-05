//Authentication middleware
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
dotenv.config({ path: '../.env' })

export const authMiddleware = (req, res, next) => {
    console.log('Cookies:', req.cookies);
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id
        console.log("in auth the req.user", req.user)
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' })
    }
}