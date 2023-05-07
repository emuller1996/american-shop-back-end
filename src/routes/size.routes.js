const { Router } = require("express");
const {
  createPostSize,
  getAllSize,
} = require("../controllers/sizeController.js");
const { validateToken } = require("../utils/authjws.js");

const sizeRouter = Router();

sizeRouter.post("/", validateToken, createPostSize);
sizeRouter.get("/",  getAllSize);

module.exports = sizeRouter;
