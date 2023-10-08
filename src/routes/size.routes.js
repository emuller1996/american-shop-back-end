const { Router } = require("express");
const {
  createPostSize,
  getAllSize,
  deleteSizeProduct,
  updateSizeProduct,
} = require("../controllers/sizeController.js");
const { validateTokenAdmin } = require("../utils/authjws.js");

const sizeRouter = Router();

sizeRouter.post("/", validateTokenAdmin, createPostSize);
sizeRouter.get("/", getAllSize);
sizeRouter.put("/:id", updateSizeProduct);
sizeRouter.delete("/:id/:idProducto", deleteSizeProduct);

module.exports = sizeRouter;
