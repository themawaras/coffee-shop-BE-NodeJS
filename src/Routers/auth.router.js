const authRouter = require("express").Router();
const argon = require("argon2");
const { register, login } = require("../Handlers/auth.handler");

authRouter.post("/register", register);
authRouter.post("/", login);

module.exports = authRouter;
