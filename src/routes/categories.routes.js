import { Router } from "express";
import { getCategories, postCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { validateTokenAdmin } from "../utils/authjws.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);

categoryRouter.post("/:name", validateTokenAdmin, postCategory);

categoryRouter.put("/:id", validateTokenAdmin, updateCategory);

categoryRouter.delete("/:id", validateTokenAdmin, deleteCategory);

export default categoryRouter;
