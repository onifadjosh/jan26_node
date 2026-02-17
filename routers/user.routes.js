const express= require('express')
const { registerUser, loginUser, changePassword, verifyAuth, sendOtp, verifyOtp } = require('../controllers/user.controllers')

const router = express.Router()


router.post('/signUp', registerUser)
router.post('/login', loginUser)
router.put('/changePassword',verifyAuth ,changePassword)
router.post("/request-otp", sendOtp)
router.post("/verify-otp", verifyOtp)




module.exports= router

