import { Router } from "express";
import { postUser, getUserCheck, blockUser, getUserByEmail, updateUser, getUsers } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.post("/", postUser);

userRouter.get("/", getUsers);

userRouter.get("/:email", getUserByEmail);

userRouter.put("/:email", updateUser);

/* userRouter.get('/:email', getUserByEmail); */

userRouter.get("/check/:email", getUserCheck);

export default userRouter;
