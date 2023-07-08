const { Router } = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} = require("../controllers/productsController.js");
const { validateToken } = require("../utils/authjws.js");

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.put("/", validateToken, updateProduct);

module.exports = productRouter;
