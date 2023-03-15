const { Router } = require('express');
const { createOrder,getOrderByEmail } = require('../controllers/orderController');


const orderRouter = Router();

orderRouter.get('/:emailUser',getOrderByEmail)
orderRouter.post('',createOrder)


module.exports = orderRouter;