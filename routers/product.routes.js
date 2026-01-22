const express = require('express');
const route = express.Router();

const { listProduct, getProducts, deleteProducts, editProduct } = require('../controllers/product.controller');

console.log('DEBUG CONTROLLER IMPORT:', {
  listProductType: typeof listProduct,
  getProductsType: typeof getProducts,
});

route.post('/addProduct', listProduct);
route.get('/getproducts', getProducts);
route.delete('/deleteProduct/:id', deleteProducts);
route.patch('/product/:id',editProduct);

module.exports = route;
