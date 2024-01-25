import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, createSizeProduct, getSizeProduct, getProductsPublished, getCommetsByUser, postCreateCommetsByUser } from "../controllers/productsController.js";

import { createPostImagesByProduct, getImagesByProduct } from "../controllers/ImagesControllers.js";
import { validateTokenAdmin, login } from "../utils/authjws.js";
const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/published", getProductsPublished);

productRouter.get("/:id", getProductById);
productRouter.post("/", validateTokenAdmin, createProduct);
productRouter.post("/:id/size", validateTokenAdmin, createSizeProduct);
productRouter.post("/:id/comments", login, postCreateCommetsByUser);
productRouter.post(
  "/:id/images",
  validateTokenAdmin,
  createPostImagesByProduct
);
productRouter.get("/:id/size", getSizeProduct);
productRouter.get("/:id/images", getImagesByProduct);
productRouter.get("/:id/comments", getCommetsByUser);

productRouter.put("/", validateTokenAdmin, updateProduct);

export default productRouter;
