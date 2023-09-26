const { Router } = require("express");
const {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");
const { validateTokenAdmin } = require("../utils/authjws.js");

const categoryRouter = Router();

categoryRouter.get("/", getCategories);

categoryRouter.post("/:name", validateTokenAdmin, postCategory);

categoryRouter.put("/:id", validateTokenAdmin, updateCategory);

categoryRouter.delete("/:id", validateTokenAdmin, deleteCategory);

module.exports = categoryRouter;
