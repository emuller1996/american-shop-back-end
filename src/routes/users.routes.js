const { Router } = require("express");
const {
  postUser,
  getUserCheck,
  blockUser,
  getUserByEmail,
  updateUser,
  getUsers,
} = require("../controllers/usersController.js");
const { validateToken } = require("../utils/authjws.js");

const userRouter = Router();

userRouter.post("/", postUser);

userRouter.get("/", validateToken, getUsers);

userRouter.get("/:email", getUserByEmail);

userRouter.put("/:email", updateUser);

/* userRouter.get('/:email', getUserByEmail); */

userRouter.get("/check/:email", getUserCheck);

module.exports = userRouter;
