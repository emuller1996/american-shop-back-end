const { Router } = require("express");

const {
  getDeliveryAddressByUser,
  createDeliveryAddress,
  updateDeliveryAddress,
} = require("../controllers/deliveryAddress.controller");
const { login } = require("../utils/authjws.js");

const deliveryAddressRouter = Router();

deliveryAddressRouter.get("/:email", login, getDeliveryAddressByUser);
deliveryAddressRouter.post("/", login, createDeliveryAddress);
deliveryAddressRouter.put("/", login, updateDeliveryAddress);

module.exports = deliveryAddressRouter;
