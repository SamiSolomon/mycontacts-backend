const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        typeof: String,
        required: [true, "please add the user name"]
    },
    email: {
        typeof: String,
        required: [true, "please add the user email "]
    },
    password: {
        typeof: String,
        required: [true, "please add the user password"]
    }
    }, {
        timeStamps:true, 
    }
)

module.exports = mongoose.model("User", userSchema)