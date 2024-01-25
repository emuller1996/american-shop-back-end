import { Router } from "express";

import { login } from "../utils/authjws.js";
import { createDeliveryAddress, getDeliveryAddressByUser, updateDeliveryAddress } from "../controllers/deliveryAddress.controller.js";

const deliveryAddressRouter = Router();

deliveryAddressRouter.get("/:email", login, getDeliveryAddressByUser);
deliveryAddressRouter.post("/", login, createDeliveryAddress);
deliveryAddressRouter.put("/", login, updateDeliveryAddress);

export default deliveryAddressRouter;
