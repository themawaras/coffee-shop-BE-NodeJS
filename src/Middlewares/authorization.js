const jwt = require("jsonwebtoken");
const { jwtKey, jwtIssuer } = require("../Configs/environment");

const isLogin = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken)
    return res.status(401).json({
      msg: "Login first",
    });
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, jwtKey, { jwtIssuer }, (err, data) => {
    if (err) {
      switch (err) {
        case "TokenExpiredError":
          return res.status(401).json({
            msg: "Token access expired, please re-login",
          });
        case "NotBeforeError":
          return res.status(401).json({
            msg: "Your access not started yet, please access on time",
          });
      }
    }
    req.userInfo = data;
    next();
  });
};

const isRole = () => {};

module.exports = {
  isLogin,
  isRole,
};
