const express= require('express')
const { registerUser, loginUser, changePassword, verifyAuth } = require('../controllers/user.controllers')

const router = express.Router()


router.post('/signUp', registerUser)
router.post('/login', loginUser)
router.put('/changePassword',verifyAuth ,changePassword)




module.exports= router

