const { showAll, insert, update, del, search } = require("../Models/products.models");

const getAllProducts = async (req, res, next) => {
  try {
    const result = await showAll();
    res.status(200).json({
      msg: "Success data retrieve",
      result: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { body } = req;
    const data = await insert(body.product_name, body.product_stock, body.product_desc, body.Image_id, body.category_id);
    res.status(201).json({
      msg: "Product input success",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { body, params } = req;
    await update(body.product_name, params.product_id);
    res.status(200).json({
      msg: `Nama produk untuk id ${params.product_id} berubah menjadi ${body.product_name}`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { params } = req;

    const data = await del(params.product_id);
    res.status(200).json({
      msg: `Produk dengan nama ${data.rows[0].product_name} pada id = ${params.product_id} berhasil dihapus.`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { query } = req;

    const data = await search(query.product_name);

    res.status(200).json({
      msg: "Success find data",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const filterProduct = async (req, res) => {
  try {
    const { query } = req;

    const data = await filter(query.product_name, query.product_price);

    res.status(200).json({
      msg: "success filter data",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const paginationProduct = async (req, res) => {
  try {
    const { query } = req;

    const data = await paginationProduct(query.limit, query.offset);

    res.status(200).json({
      msg: "page retrive",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

module.exports = {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  filterProduct,
  paginationProduct,
};
