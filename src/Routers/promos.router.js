const express = require("express");
const promoRouter = express.Router();

const { getAllPromos, addNewPromo, updatePromo, deletePromo } = require("../Handlers/promos.handler");

promoRouter.get("/", getAllPromos);

promoRouter.post("/", addNewPromo);

promoRouter.patch("/:promo_id", updatePromo);

promoRouter.delete("/:promo_id", deletePromo);

module.exports = promoRouter;
