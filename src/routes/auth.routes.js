const { Router } = require("express");
const { authUser } = require("../controllers/AuthController");

const authRouter = Router();
authRouter.post("/", authUser);

module.exports = authRouter;
