const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("database connected: ", connect.connection.host)
    }
    catch(err){
        console.log("Database connection failed:", err)
        process.ext(1)
    }
}

module.exports = connectDb