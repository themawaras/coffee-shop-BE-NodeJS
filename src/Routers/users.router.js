const express = require("express");
const userRouter = express.Router();

const { getAllUsers, addNewUser, updateUser, deleteUser } = require("../Handlers/users.handler");

userRouter.get("/", getAllUsers);

// userRouter.post("/", addNewUser);

userRouter.patch("/:user_id", updateUser);

userRouter.delete("/:user_id", deleteUser);

module.exports = userRouter;
