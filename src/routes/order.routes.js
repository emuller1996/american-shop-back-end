const { Router } = require("express");
const {
  createOrder,
  getOrderByEmail,
  getOrderAllAdmin,
  getOrderById
} = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.get("/", getOrderAllAdmin);
orderRouter.get("/:emailUser", getOrderByEmail);
orderRouter.get("/comfirmation/:id", getOrderById);

orderRouter.post("", createOrder);

module.exports = orderRouter;
