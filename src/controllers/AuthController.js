import { UserAdmin } from "../db.js";
import jsonwebtoken from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const authUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  try {
    var userDb = await UserAdmin.findOne({
      where: { username: username },
    });
    if (!userDb) return res.status(403).json({ message: "Usuario incorrecta." , detail:`El usuario '${username}' no esta registrado en la base de datos.` });
    if (!(await userDb.comparePassword(password))) {
      return res.status(403).json({ message: "Password  incorrecta." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error comparePassword" });
  }

  const userSend = userDb.dataValues;
  delete userSend.password;
  try {
    const accessToken = generateAccessToken(userDb.dataValues);
    return res.header("authorization", accessToken).json({
      message: "USUARIO AUTENTICADO",
      token: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error Generando Token" });
  }
};

const validateToken = async (req, res) => {
  const token = req.params.token;

  jsonwebtoken.verify(token, process.env.SECRECT_KEY, (err, user) => {
    if (err) {
      return res
        .status(405)
        .json({ message: "ERROR-> TOKEN EXPIRED OR INCORRECT" });
    } else {
      return res.status(200).json({ message: "Token Valid" });
    }
  });
};

const generateAccessToken = (user) => {
  return jsonwebtoken.sign(user, process.env.SECRECT_KEY, { expiresIn: "60m" });
};

export { authUser, validateToken };
