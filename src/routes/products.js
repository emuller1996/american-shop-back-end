import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  createSizeProduct,
  getSizeProduct,
  getProductsPublished,
  getCommetsByUser,
  postCreateCommetsByUser,
} from "../controllers/productsController.js";

import {
  createPostImagesByProduct,
  getImagesByProduct,
} from "../controllers/ImagesControllers.js";
import { validateTokenAdmin, validateToken, login } from "../utils/authjws.js";
import { validateRole } from "../middlewares/authRole.middleware.js";
const productRouter = Router();

productRouter.get(
  "/",
  validateToken,
  validateRole(["Admin", "Asesor"]),
  getProducts
);
productRouter.get("/published", getProductsPublished);

productRouter.get("/:id", getProductById);
productRouter.post("/", validateToken, validateRole(["Admin"]), createProduct);
productRouter.post(
  "/:id/size",
  validateToken,
  validateRole(["Admin", "Asesor"]),
  createSizeProduct
);
productRouter.post("/:id/comments", login, postCreateCommetsByUser);
productRouter.post(
  "/:id/images",
  validateToken,
  validateRole(["Admin", "Asesor"]),
  createPostImagesByProduct
);
productRouter.get(
  "/:id/size",
  validateToken,
  validateRole(["Admin", "Asesor"]),
  getSizeProduct
);
productRouter.get("/:id/images", getImagesByProduct);
productRouter.get("/:id/comments", getCommetsByUser);

productRouter.put("/", validateTokenAdmin, updateProduct);

export default productRouter;
