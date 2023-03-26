const { Router } = require("express");
const { authUser, validateToken } = require("../controllers/AuthController");

const authRouter = Router();
authRouter.post("/", authUser);
authRouter.get("/validate/:token", validateToken);


module.exports = authRouter;
