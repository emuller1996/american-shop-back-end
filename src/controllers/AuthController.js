const { UserAdmin } = require("../db.js");
const jws = require("jsonwebtoken");

const authUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);

  const userDb = await UserAdmin.findOne({
    where: { username: username, password: password},
  });

  if (!userDb)
    return res
      .status(403)
      .json({ message: "USER NO REGISTRED IN THE DATABASE." });

  const accessToken = generateAccessToken({username});

  return res.header("authorization", accessToken).json({
    message: "USUARIO AUTENTICADO",
    token: accessToken,
  });
};

const generateAccessToken = (user) => {
  return jws.sign(user, process.env.SECRECT_KEY, { expiresIn: "5m" });
};

module.exports = {
  authUser,
};
