const express = require("express");
const promoRouter = express.Router();

const { getAllPromos, addNewPromo, updatePromo, deletePromo } = require("../Handlers/promos.handler");
const { isLogin, isRole } = require("../Middlewares/authorization");

promoRouter.get("/", getAllPromos);

promoRouter.post("/", isLogin, isRole, addNewPromo);

promoRouter.patch("/:promo_id", isLogin, isRole, updatePromo);

promoRouter.delete("/:promo_id", isLogin, isRole, deletePromo);

module.exports = promoRouter;
