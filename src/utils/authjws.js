const jws = require("jsonwebtoken");

const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const { auth } = require('express-oauth2-jwt-bearer');

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

const jwtCheck = auth({
  audience: 'https://AmericanShop/',
  issuerBaseURL: 'https://dev-yofvd6opsno4u5yt.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

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
  login,
  jwtCheck
};
