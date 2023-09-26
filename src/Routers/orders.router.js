const express = require("express");
const orderRouter = express.Router();

const { getAllOrders, addNewOrder, updateOrder, deleteOrder } = require("../Handlers/orders.handler");
const { isLogin, isRole } = require("../Middlewares/authorization");

orderRouter.get("/", getAllOrders);

orderRouter.post("/", isLogin, addNewOrder);

// orderRouter.patch("/:order_id", updateOrder);

// orderRouter.delete("/:order_id", deleteOrder);

module.exports = orderRouter;
