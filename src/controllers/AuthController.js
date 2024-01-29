import { UserAdmin } from "../db.js";
import jsonwebtoken from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const authUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);

  const userDb = await UserAdmin.findOne({
    where: { username: username },
  });
  console.log(userDb);
  if (!userDb) return res.status(403).json({ message: "Usuario  incorrecta." });

  try {
    if (!(await userDb.comparePassword(password))) {
      return res.status(403).json({ message: "Password  incorrecta." });
    }
  } catch (error) {
    console.log(error);
  }

  const accessToken = generateAccessToken({ username });

  return res.header("authorization", accessToken).json({
    message: "USUARIO AUTENTICADO",
    token: accessToken,
  });
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
