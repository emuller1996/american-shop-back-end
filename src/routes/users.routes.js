import { Router } from "express";
import {
  postUser,
  getUserCheck,
  blockUser,
  getUserByEmail,
  updateUser,
  getUsers,
} from "../controllers/usersController.js";
import { Notification, User } from "../db.js";

const userRouter = Router();

userRouter.post("/", postUser);

userRouter.get("/", getUsers);

userRouter.get("/:email", getUserByEmail);

userRouter.put("/:email", updateUser);

/* userRouter.get('/:email', getUserByEmail); */

userRouter.get("/check/:email", getUserCheck);

userRouter.get("/check/:email/notifications", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const r = await Notification.findAll({
      where: { UserId: user.dataValues.id },
      order:  [['createdAt',"DESC"]]
    });
    console.log(r);
    return res.json(r);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

userRouter.patch("/check/notifications/:idNoti/", async (req, res) => {
  try {
    const { idNoti } = req.params;
    const noti = await Notification.findByPk(idNoti);
    noti.status = true;
    noti.save();

    return res.json({ message: "Notificaion Leida" });
  } catch (error) {
    res.status(404).json(error.message);
  }
});

export default userRouter;
