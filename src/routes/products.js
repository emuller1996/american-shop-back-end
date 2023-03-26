const { Router } = require('express');
const { getProducts,getProductById, createProduct,updateProduct } = require('../controllers/productsController.js');
const { validateToken } = require('../utils/authjws.js');

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id',validateToken, getProductById);
productRouter.post('/',validateToken,createProduct)
productRouter.put('/',validateToken,updateProduct)


module.exports = productRouter;
