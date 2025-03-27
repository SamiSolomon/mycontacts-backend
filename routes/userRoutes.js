const express = require("express")
const { registerUser, currentUser, loginUser } = require("../controller/userController")

const validateToken = require("../middleware/validateTokenHandler")

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser)

router.post("/current", validateToken, currentUser)


module.express = router; 

