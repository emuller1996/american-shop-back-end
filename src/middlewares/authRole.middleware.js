import jwt_decode from "jwt-decode";
import { UserAdmin } from "../db.js";

const validateRole = (role) => async (req, res, next) => {
  const accessToken = req.headers["access-token"];
  const data = jwt_decode(accessToken);

  if (Array.isArray(role)) {
    console.log(data, role);
    const userDb = await UserAdmin.findByPk(parseInt(data.id));
    console.log(userDb);
    console.log(role.includes(userDb.dataValues.role));
    if (role.includes(userDb.dataValues.role)) {
      next();
    } else {
      return res
        .status(404)
        .json({ message: "No Tienes Permiso para esta Accion" });
    }
  } else {
    return res
      .status(500)
      .json({ message: "Argumento validateRole(['No es un Array']) " });
  }
};

export { validateRole };
