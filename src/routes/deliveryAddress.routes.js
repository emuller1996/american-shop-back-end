const { Router } = require('express');

const { getDeliveryAddressByUser,createDeliveryAddress } = require('../controllers/deliveryAddress.controller')

const deliveryAddressRouter = Router();

deliveryAddressRouter.get('/:email',getDeliveryAddressByUser)

deliveryAddressRouter.post('/',createDeliveryAddress)


module.exports = deliveryAddressRouter;