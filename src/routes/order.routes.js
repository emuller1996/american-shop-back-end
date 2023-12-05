const { Router } = require("express");
const {
  createOrder,
  getOrderByEmail,
  getOrderAllAdmin,
  getOrderById,
} = require("../controllers/orderController");
const { login } = require("../utils/authjws.js");

const orderRouter = Router();

orderRouter.get("/", getOrderAllAdmin);
orderRouter.get("/:emailUser", login, getOrderByEmail);
orderRouter.get("/comfirmation/:id", getOrderById);
orderRouter.post("", createOrder);

module.exports = orderRouter;
