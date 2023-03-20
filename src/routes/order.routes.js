const { Router } = require("express");
const {
  createOrder,
  getOrderByEmail,
  getOrderAllAdmin,
} = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.get("/", getOrderAllAdmin);
orderRouter.get("/:emailUser", getOrderByEmail);
orderRouter.post("", createOrder);

module.exports = orderRouter;
