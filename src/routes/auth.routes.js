import { Router } from "express";

import { authUser, validateToken } from "../controllers/AuthController.js";

const authRouter = Router();
authRouter.post("/", authUser);
authRouter.get("/validate/:token", validateToken);

export default authRouter;
