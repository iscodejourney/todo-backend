const router = require("express").Router();

const {registerNewUser, loginController }= require("../controller/users-controller.js")


router.post("/register" , registerNewUser)
router.post("/login" , loginController)

module.exports = router