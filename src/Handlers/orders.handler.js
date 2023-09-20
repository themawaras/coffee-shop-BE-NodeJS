const { showAll, insert, update, del } = require("../Models/orders.models");

const getAllOrders = async (req, res) => {
  try {
    const data = await showAll();

    res.status(200).json({
      msg: "Orders data retrieve",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const addNewOrder = async (req, res) => {
  try {
    const { body } = req;

    const data = await insert(body.user_id, body.order_shipping, body.order_status, body.order_total, body.payment_id);

    res.status(201).json({
      msg: "Success input data order",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { body, params } = req;

    const data = await update(body.user_id, body.order_shipping, body.order_status, body.order_total, body.payment_id, params.order_id);

    res.status(200).json({
      msg: `Data order dengan ID = ${params.order_id} berhasil diubah`,
      result: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { params } = req;

    const data = await del(params.order_id);

    res.status(200).json({
      msg: `Data order dengan id ${params.order_id} berhasil dihapus`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal sever error",
    });
  }
};

module.exports = {
  getAllOrders,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
