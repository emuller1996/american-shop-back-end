const { Router } = require('express');
const { getProducts,getProductById, createProduct,updateProduct } = require('../controllers/productsController.js');

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/',createProduct)
productRouter.put('/',updateProduct)


module.exports = productRouter;
