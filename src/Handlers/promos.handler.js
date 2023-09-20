const { showAll, insert, update, del } = require("../Models/promos.models");

const getAllPromos = async (req, res) => {
  try {
    const data = await showAll();
    res.status(200).json({
      msg: "Success data retrieve",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const addNewPromo = async (req, res) => {
  try {
    const { body } = req;
    const data = await insert(body.promo_name, body.promo_desc, body.promo_type, body.promo_flat, body.promo_percent);

    res.status(201).json({
      msg: "Promo input success",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const updatePromo = async (req, res) => {
  try {
    const { body, params } = req;

    const data = await update(body.promo_name, body.promo_desc, body.promo_type, body.promo_flat, body.promo_percent, params.promo_id);

    res.status(200).json({
      msg: `Nama promo ${body.promo_name} berhasil diubah`,
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const deletePromo = async (req, res) => {
  try {
    const { params } = req;

    const data = await del(params.promo_id);

    res.status(200).json({
      msg: `Promo dengan nama ${data.rows[0].promo_name} pada id = ${params.promo_id} berhasil dihapus.`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  getAllPromos,
  addNewPromo,
  updatePromo,
  deletePromo,
};
