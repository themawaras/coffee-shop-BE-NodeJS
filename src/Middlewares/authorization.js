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
            msg: "Your session has expired, please login again",
          });
        case "NotBeforeError":
          return res.status(401).json({
            msg: "Your access not started yet, please access on time",
          });
        case "JsonWebTokenError":
          return res.status(401).json({
            msg: "Your session has expired, please login again",
          });
      }
    }
    req.userInfo = data;
    next();
  });
};

const isRole = (req, res, next) => {
  const { role } = req.userInfo;
  if (role !== true) return res.status(404).json({ msg: "Page is not found" });
  next();
};

module.exports = {
  isLogin,
  isRole,
};
