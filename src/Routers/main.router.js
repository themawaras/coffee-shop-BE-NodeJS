const express = require("express");
const mainRouter = express.Router();

const productRouter = require("./products.router");
const promoRouter = require("./promos.router");
const userRouter = require("./users.router");
const orderRouter = require("./orders.router");
const authRouter = require("./auth.router");

// const { isLogin, isRole } = require("../Middlewares/authorization");
const { singleUpload } = require("../Middlewares/diskUpload");

mainRouter.get("/", (req, res, next) => {
  res.send("Welcome to Fazz Coffee Shop!");
});

mainRouter.post("/upload", singleUpload("image"), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    msg: "Uploaded",
  });
});

mainRouter.use("/products", productRouter);
mainRouter.use("/promos", promoRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
