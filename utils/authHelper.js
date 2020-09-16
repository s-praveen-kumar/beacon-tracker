const jwt = require("jsonwebtoken");
const secret = require("./secrets").JWT_SECRET;

function generateAccessToken(data) {
  return jwt.sign(data, secret, { expiresIn: "3600m" });
}
function validateToken(token) {
  if (token) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
}

function authHandler(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json({ success: false, msg: "Need to be logged in" });
  const data = validateToken(token);
  if (!data) {
    return res
      .status(401)
      .json({ success: false, msg: "Session expired or invalid. Login again" });
  }
  req.body.authData = data;
  if (next) next();
}
module.exports = { generateAccessToken, validateToken, authHandler };
