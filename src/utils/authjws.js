const jws = require("jsonwebtoken");
const {  UserAdmin } = require("../db.js");

const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const jwt_decode = require('jwt-decode');

const {AUTH0_AUDIENCE, AUTH0_ISSUER} = process.env

const login = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${AUTH0_ISSUER}.well-known/jwks.json`
  }),
  audience: AUTH0_AUDIENCE,
  issuer: AUTH0_ISSUER,
  algorithms: ['RS256'],
});


const validateTokenAdmin = async (req, res, next) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken) return res.status(403).json({ message: "ACCES DENIED: TOKEN NO SUMINISTRADO." });
  jws.verify(accessToken, process.env.SECRECT_KEY, (err, user) => {
    if (err) {
      return res
        .status(405)
        .json({ message: "ERROR-> TOKEN EXPIRED OR INCORRECT" });
    } else {
      const {username} = jwt_decode(accessToken);
      console.log(username);

      const userDb =UserAdmin.findOne({
        where: { username: username, role: "Admin" },
      });
      userDb.then(data => {
        console.log(data)
        if(data===null){
          return res.status(403).json({ message: "ACCES DENIED: NO TIENES PERMISO PARA ESTA ACCION." });
        }else{
          next();
        }
      })      
    }
  });
};
const validateToken = (req, res, next) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken) return res.status(403).json({ message: "ACCES DENIED: TOKEN NO SUMINISTRADO." });
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
  validateTokenAdmin,
  login,
  validateToken
};
