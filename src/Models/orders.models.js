const db = require("../Configs/postgres");

const showAll = () => {
  const sql = `select order_id as "Order ID", user_id as "User ID", order_shipping as "Jenis", order_status as "Status", order_total as "Total", payment_id as "ID Pembayaran", created_at as "Dibuat Tgl" from orders order by created_at`;
  return db.query(sql);
};

const insert = (userId, orderShipping, orderStatus, orderTotal, paymentId) => {
  const sql = `insert into orders (user_id, order_shipping, order_status, order_total, payment_id) values ($1, $2, $3, $4, $5) returning user_id, order_shipping, order_status, order_total, payment_id`;
  const values = [userId, orderShipping, orderStatus, orderTotal, paymentId];
  return db.query(sql, values);
};

const update = (userId, orderShipping, orderStatus, orderTotal, paymentId, orderId) => {
  const sql = `update orders set user_id = $1, order_shipping = $2, order_status = $3, order_total = $4, payment_id = $5, updated_at = now() where order_id = $6 returning order_id, user_id, order_shipping, order_status, order_total, payment_id`;
  const values = [userId, orderShipping, orderStatus, orderTotal, paymentId, orderId];
  return db.query(sql, values);
};

const del = (orderId) => {
  const sql = `delete from orders where user_id = $1 returning order_id, user_id, order_shipping, order_status, order_total, payment_id`;
  const values = [orderId];
  return db.query(sql, values);
};

module.exports = {
  showAll,
  insert,
  update,
  del,
};
