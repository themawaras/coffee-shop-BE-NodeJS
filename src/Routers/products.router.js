const express = require("express");
const productRouter = express.Router();

const { getAllProducts, addNewProduct, updateProduct, deleteProduct, searchProduct, filterProduct, paginationProduct } = require("../Handlers/products.handler");

const { isLogin, isRole } = require("../Middlewares/authorization");

productRouter.get("/", getAllProducts);

productRouter.post("/", isLogin, isRole, addNewProduct);

productRouter.patch("/:product_id", isLogin, isRole, updateProduct);

productRouter.delete("/:product_id", isLogin, isRole, deleteProduct);

productRouter.get("/search", searchProduct);

productRouter.get("/products/filter", filterProduct);

productRouter.get("/products/page", paginationProduct);

module.exports = productRouter;
