const { UserAdmin } = require("../db.js");
const jws = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');


const authUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);

  const userDb = await UserAdmin.findOne({
    where: { username: username, password: password },
  });

  if (!userDb)
    return res
      .status(403)
      .json({ message: "Usuario o Contraseña incorrecta." });

  const accessToken = generateAccessToken({ username });

  return res.header("authorization", accessToken).json({
    message: "USUARIO AUTENTICADO",
    token: accessToken,
  });
};

const validateToken = async (req, res) => {
  const token = req.params.token;

  jws.verify(token, process.env.SECRECT_KEY, (err, user) => {
    if (err) {
      return res
        .status(405)
        .json({ message: "ERROR-> TOKEN EXPIRED OR INCORRECT" });
    } else {
      console.log(jwt_decode(token));

      return res.status(200).json({ message: "Token Valid" });
    }
  });
};

const generateAccessToken = (user) => {
  return jws.sign(user, process.env.SECRECT_KEY, { expiresIn: "60m" });
};

module.exports = {
  authUser,
  validateToken,
};
