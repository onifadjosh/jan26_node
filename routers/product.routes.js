const express = require('express')
const { listProduct } = require('../controllers/product.controller')

const router = express.Router() 


router.post('/addProduct', listProduct)


module.exports=router