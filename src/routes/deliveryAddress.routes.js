const { Router } = require('express');

const { getDeliveryAddressByUser,createDeliveryAddress, updateDeliveryAddress } = require('../controllers/deliveryAddress.controller')

const deliveryAddressRouter = Router();

deliveryAddressRouter.get('/:email',getDeliveryAddressByUser)
deliveryAddressRouter.post('/',createDeliveryAddress)
deliveryAddressRouter.put('/',updateDeliveryAddress)



module.exports = deliveryAddressRouter;