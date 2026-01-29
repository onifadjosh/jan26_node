const express= require('express')
const { registerUser } = require('../controllers/user.controllers')

const router = express.Router()


router.post('/signUp', registerUser)




module.exports= router

