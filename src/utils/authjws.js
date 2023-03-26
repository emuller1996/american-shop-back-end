const jws = require("jsonwebtoken");


const validateToken = (req, res, next) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken) return res.status(403).json({ message: "ACCES DENIED" });
  jws.verify(accessToken, process.env.SECRECT_KEY, (err, user) => {
    if (err) {
      return res
        .status(405)
        .json({ message: "ERROR-> TOKEN EXPIRED OR INCORRECT" });
    } else {
      next();
    }
  });
};

module.exports = {
  validateToken,
};
