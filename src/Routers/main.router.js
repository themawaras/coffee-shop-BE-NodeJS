const express = require("express");
const mainRouter = express.Router();

const productRouter = require("./products.router");
const promoRouter = require("./promos.router");
const userRouter = require("./users.router");
const orderRouter = require("./orders.router");
const authRouter = require("./auth.router");

mainRouter.get("/", (req, res, next) => {
  res.send("Welcome to Fazz Coffee Shop!");
});

const { isLogin, isRole } = require("../Middlewares/authorization");

mainRouter.use("/products", productRouter);
mainRouter.use("/promos", promoRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
