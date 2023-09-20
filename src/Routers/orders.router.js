const express = require("express");
const orderRouter = express.Router();

const { getAllOrders, addNewOrder, updateOrder, deleteOrder } = require("../Handlers/orders.handler");

orderRouter.get("/", getAllOrders);

orderRouter.post("/", addNewOrder);

orderRouter.patch("/:order_id", updateOrder);

orderRouter.delete("/:order_id", deleteOrder);

module.exports = orderRouter;
