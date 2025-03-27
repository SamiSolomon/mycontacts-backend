const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email already in use!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,  // Store hashed password
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET, // Make sure you have this in your environment variables
            { expiresIn: "2h" } // Extended expiration time for a real-world app
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// Current User Info
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
