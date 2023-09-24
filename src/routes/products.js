const { Router } = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  createSizeProduct,
  getSizeProduct
} = require("../controllers/productsController.js");
const { validateToken, login } = require("../utils/authjws.js");
const productRouter = Router();



productRouter.get("/",login, getProducts);
productRouter.get("/:id",login, getProductById);
productRouter.post("/", createProduct);
productRouter.post("/:id/size", createSizeProduct);
productRouter.get("/:id/size", getSizeProduct);

productRouter.put("/", validateToken, updateProduct);

module.exports = productRouter;
