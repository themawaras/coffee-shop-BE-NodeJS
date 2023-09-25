const express = require("express");
const userRouter = express.Router();

const { getAllUsers, addNewUser, updateUser, deleteUser } = require("../Handlers/users.handler");
const { isLogin, isRole } = require("../Middlewares/authorization");

userRouter.get("/", isLogin, isRole, getAllUsers);

// userRouter.post("/", addNewUser);

userRouter.patch("/:user_id", isLogin, updateUser);

userRouter.delete("/:user_id", isLogin, deleteUser);

module.exports = userRouter;
