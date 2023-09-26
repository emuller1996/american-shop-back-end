const { Router } = require("express");
const {
  createPostSize,
  getAllSize,
} = require("../controllers/sizeController.js");
const { validateTokenAdmin } = require("../utils/authjws.js");

const sizeRouter = Router();

sizeRouter.post("/", validateTokenAdmin, createPostSize);
sizeRouter.get("/",  getAllSize);

module.exports = sizeRouter;
