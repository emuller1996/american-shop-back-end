import { Router } from "express";
import { UserAdmin } from "../db.js";

const usersRouter = Router();
import { validateTokenAdmin } from "../utils/authjws.js";

usersRouter.get("/", validateTokenAdmin, async (req, res) => {
  try {
    const usersAdmin = await UserAdmin.findAll({
      attributes: { exclude: ["id", "password"] },
    });
    return res.status(200).json(usersAdmin);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
usersRouter.get("/:id", validateTokenAdmin, async (req, res) => {
  try {
    const userAdmin = await UserAdmin.findByPk(req.params.id, {
      attributes: { exclude: ["id", "password"] },
    });
    console.log(userAdmin);
    return res.status(200).json(userAdmin);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

usersRouter.post("/", validateTokenAdmin, async (req, res) => {
  const data = req.body;

  try {
    const userCreate = await UserAdmin.create( data );
    return res
      .status(201)
      .json({ message: "Usuario Creado", user: userCreate });
  } catch (error) {
    console.log(error);
  }
});
usersRouter.patch("/change-password", validateTokenAdmin, async (req, res) => {
  try {
    return res.status(200).json("change-password");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default usersRouter;
