const asyncHandler = require("express-async-handler")
const bcrypt = require('bcrypt')
const User = require("/models/userModel")
const jwt = require("jsonwebtoken")

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new Error("All fields are mandatory!")
    }

    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        throw new Error("Email already in use!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log()

    const user = await User.create({
        username,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,

       })
    } else {
        res.status(400);
        throw new Error("User data not valid ")
   }

    res.json({message: "Register the user"})

})


const loginUser = asyncHandler(async (res, req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required")
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, ACCESS_TOKEN_SECRET, {expiresIn: "2m"});
    } else {
        res.status(401); 
        throw new Error("Invalid email or password")
    }

    res.status(200).json({ accessToken });
})