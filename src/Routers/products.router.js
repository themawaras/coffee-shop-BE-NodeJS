const express = require("express");
const productRouter = express.Router();

const { getAllProducts, addNewProduct, updateProduct, deleteProduct, searchProduct, filterProduct } = require("../Handlers/products.handler");

productRouter.get("/", getAllProducts);

productRouter.post("/", addNewProduct);

productRouter.patch("/:product_id", updateProduct);

productRouter.delete("/:product_id", deleteProduct);

productRouter.get("/search", searchProduct);

productRouter.get("/products/filter", filterProduct);

module.exports = productRouter;
