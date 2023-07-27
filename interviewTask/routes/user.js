var express = require('express');
var router = express.Router();

const {normal_signup,login} 
= require("../controller/user")

const {authenticateToken} = require('../auth')

router.post("/user_signup", normal_signup)
router.post("/user_login",authenticateToken,login)





module.exports = router