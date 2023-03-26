const { Router } = require("express");
const {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");
const { validateToken } = require("../utils/authjws.js");

const categoryRouter = Router();

categoryRouter.get("/", validateToken, getCategories);

categoryRouter.post("/:name", validateToken, postCategory);

categoryRouter.put("/:id", validateToken, updateCategory);

categoryRouter.delete("/:id", validateToken, deleteCategory);

module.exports = categoryRouter;
