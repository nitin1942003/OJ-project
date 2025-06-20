import dotenv from "dotenv";
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Token from "../models/token.js"; // Use capital 'T' for the model name
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

dotenv.config({ path: '../.env' });

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Generate a verification token
        const token = await new Token({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        // Create a verification URL
        const url = `${process.env.CLIENT_URL}/auth/${newUser.id}/verify-email/${token.token}`;

        // Create an HTML content for the verification email
        const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Welcome to Run it in!</h2>
        <p>Hi ${newUser.firstname},</p>
        <p>Thank you for registering on our platform. Please click the button below to verify your email address:</p>
        <p><a href="${url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
        <p>If the button doesn't work, you can also verify your email by clicking on the following link:</p>
        <p><a href="${url}">${url}</a></p>
        <p>If you did not create an account, no further action is required.</p>
        <p>Best regards,<br/>The Run it in Team</p>
    </div>
`;

        // Send the verification email
        await sendEmail(newUser.email, "Verify Your Email", `Please verify your email by clicking the following link: ${url}`, htmlContent);

        res.status(201).json({ message: "User registered. Please check your email to verify your account." });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).send({ message: "Invalid link" });
        }

        const token = await Token.findOne({ userId: user._id, token: req.params.token });
        if (!token) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await User.findByIdAndUpdate(user._id, { $set: { verified: true } }, { new: true });

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if email is verified
        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();

                // Create a verification URL
                const url = `${process.env.CLIENT_URL}/auth/${user.id}/verify-email/${token.token}`;

                // Send the verification email
                await sendEmail(user.email, "Verify Your Email", url);
            }
            return res.status(402).json({ message: 'A verification email is sent to your email.' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password is incorrect!' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Store JWT token in an HTTP-only cookie
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true, // Can only be changed by the server, not the client
        };

        // Send the response and token in the cookie
        res.status(200).cookie('token', token, cookieOptions).json({
            message: 'User is logged in',
            success: true,
            token,
            user: { firstName: user.firstname, lastName: user.lastname, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

export const checkAuth = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = await User.findById(req.user).select('-password'); // This excludes the password from the response
        res.json({ isAuthenticated: true, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
