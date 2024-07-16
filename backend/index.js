const express = require('express');
const app = express();
const { DBConnections } = require('./database/db.js');
const User = require('./models/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
dotenv.config();



const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnections();

app.get("/", (req, res) => {
    res.send("Welcome to Class!");
});

app.post("/register", async (req, res) => {
    try {
        // Get all data from request body
        const { firstname, lastname, email, password } = req.body;

        // Check that all the data exists
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all required fields!");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send("User already exists!");
        }

        // Encrypt the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Save the user to db
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });

        // Generate a token for user and send it
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });
        user.token = token;
        user.password = undefined;

        res.status(201).json({
            message: "You have successfully registered!",
            success: true,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        // Get all the user data
        const { email, password } = req.body;

        // Check that all the data exists
        if (!(email && password)) {
            return res.status(400).send("Please enter all information");
        }

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        // Match the password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        user.token = token;
        user.password = undefined;

        // Store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, // Only manipulated by server, not user
        };

        // Send token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
