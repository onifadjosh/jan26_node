const express = require('express');
const route = express.Router();

const { listProduct, getProducts, deleteProducts, editProduct, getProductsBy } = require('../controllers/product.controller');
const { verifyAuth } = require('../controllers/user.controllers');

console.log('DEBUG CONTROLLER IMPORT:', {
  listProductType: typeof listProduct,
  getProductsType: typeof getProducts,
});

route.post('/addProduct',verifyAuth,  listProduct);
route.get('/getproducts', verifyAuth, getProducts);
route.delete('/deleteProduct/:id', deleteProducts);
route.patch('/product/:id',editProduct);
route.get('/products/',getProductsBy);

module.exports = route;
