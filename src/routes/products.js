const { Router } = require('express');
const { getProducts } = require('../controllers/productsController.js');

const productRouter = Router();

productRouter.get('/', getProducts);


module.exports = productRouter;
