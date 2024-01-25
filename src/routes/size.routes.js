import { Router } from "express";
import { createPostSize, getAllSize, deleteSizeProduct, updateSizeProduct } from "../controllers/sizeController.js";
import { validateTokenAdmin } from "../utils/authjws.js";

const sizeRouter = Router();

sizeRouter.post("/", validateTokenAdmin, createPostSize);
sizeRouter.get("/", getAllSize);
sizeRouter.put("/:id", updateSizeProduct);
sizeRouter.delete("/:id/:idProducto", deleteSizeProduct);

export default sizeRouter;
