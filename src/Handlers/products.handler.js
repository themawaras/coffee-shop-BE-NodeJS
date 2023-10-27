const { showAll, insert, update, del, search, countData } = require("../Models/products.models");

const getAllProducts = async (req, res) => {
  try {
    const { query } = req;
    let result;
    if (query.name || query.category || query.minrange || query.maxrange || query.page || query.limit) {
      if (query.minrange >= query.maxrange) {
        return res.status(400).json({
          msg: "The range your input is not correct!",
        });
      }

      result = await filtersProducts(query.name, query.category, query.minrange, query.maxrange, query.page, query.limit);

      if (result.rows.length == 0) {
        return res.status(200).json({
          msg: "Products not found!",
          result: [],
        });
      }

      const metaResult = await count(query.name, query.category, query.minrange, query.maxrange);

      const totalData = metaResult.rows[0].count;
      const isLastPage = Math.ceil(totalData / parseInt(query.limit) <= parseInt(query.page));

      let linkNext = `${req.baseUrl}?page=${parseInt(query.page) + 1}&limit=${parseInt(query.limit)}`;

      if (query.name) linkNext += `&name=${query.name}`;
      if (query.category) linkNext += `&category=${query.category}`;
      if (query.minrange && query.maxrange) linkNext += `&minrange=${query.minrange}&maxrange=${query.maxrange}`;

      let linkPrev = `${req.baseUrl}?page=${parseInt(query.page) - 1}&limit=${parseInt(query.limit)}`;

      if (query.name) linkPrev += `&name=${query.name}`;
      if (query.category) linkPrev += `&category=${query.category}`;
      if (query.minrange && query.maxrange) linkPrev += `&minrange=${query.minrange}&maxrange=${query.maxrange}`;

      return res.status(200).json({
        msg: "Success",
        result: result.rows,
        meta: {
          page: query.page,
          totalData,
          next: isLastPage ? null : linkNext,
          prev: query.page == "1" ? null : linkPrev,
        },
      });
    }

    result = await getAll();

    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Products not found!",
      });
    }

    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { body } = req;
    if (!body.product_name || !body.product_stock || !body.product_desc || !body.category_id) return res.status(400).json({ msg: "field cannot be empty" });
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

    const result = await update(body, params.product_id);
    res.status(200).json({
      msg: `Nama produk untuk id ${params.product_id} berubah menjadi ${body.product_name}`,
    });
  } catch (err) {
    console.log(err);
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
