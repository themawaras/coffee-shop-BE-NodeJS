const db = require("../Configs/postgres");

const showAll = () => {
  const sql = `select promo_id as "No ID", promo_name as "Nama Promo" from promos order by promo_id asc`;
  return db.query(sql);
};

const insert = (promoName, promoDesc, promoType, promoFlat, promoPercent) => {
  const sql = "insert into promos (promo_name, promo_desc, promo_type, promo_flat, promo_percent) values ($1, $2, $3, $4, $5) returning promo_id, promo_name, promo_desc, promo_type, promo_flat, promo_percent";
  const values = [promoName, promoDesc, promoType, promoFlat, promoPercent];
  return db.query(sql, values);
};

const update = (promoName, promoDesc, promoType, promoFlat, promoPercent, promoId) => {
  const sql = `update promos set promo_name = $1, promo_desc = $2, promo_type = $3, promo_flat = $4, promo_percent = $5, updated_at = now() where promo_id = $6 returning promo_id, promo_name, promo_desc, promo_type, promo_flat, promo_percent;`;
  const values = [promoName, promoDesc, promoType, promoFlat, promoPercent, promoId];
  return db.query(sql, values);
};

const del = (promoId) => {
  const sql = `delete from promos where promo_id = $1 returning promo_name`;
  const values = [promoId];
  return db.query(sql, values);
};

module.exports = {
  showAll,
  insert,
  update,
  del,
};
