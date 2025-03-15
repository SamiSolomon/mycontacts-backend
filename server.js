const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use(express.json())
app.use(errorHandler)

app.use("/api/contacts", require("./routes/contactRoutes"))

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})



