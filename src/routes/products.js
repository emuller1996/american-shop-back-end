const { Router } = require('express');
const { getProducts,getProductById, createProduct } = require('../controllers/productsController.js');

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/',createProduct)



module.exports = productRouter;
