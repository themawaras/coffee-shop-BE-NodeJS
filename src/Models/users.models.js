const db = require("../Configs/postgres");

const showAll = () => {
  const sql = `select user_id as "User ID", user_fullname as "Nama Lengkap", user_email as "Email", user_phone as "No Telp", user_address as "Alamat" from users order by user_id asc`;
  return db.query(sql);
};

const insert = (UserFullname, userEmail, userPhone, userPassword, userAddress, userAdmin) => {
  const sql = `insert into users (user_fullname, user_email, user_phone, user_password, user_address, user_admin) values ($1, $2, $3, $4, $5, $6) returning user_id, user_fullname, user_email, user_phone, user_address, user_admin`;
  const values = [UserFullname, userEmail, userPhone, userPassword, userAddress, userAdmin];
  return db.query(sql, values);
};

const update = (userFullname, userAddress, userId) => {
  const sql = `update users set user_fullname = $1, user_address = $2, updated_at = now() where user_id = $3 returning user_fullname, user_email, user_phone, user_address`;
  const values = [userFullname, userAddress, userId];
  return db.query(sql, values);
};

const del = (userId) => {
  const sql = `delete from users where user_id = $1 returning user_fullname`;
  const values = [userId];
  return db.query(sql, values);
};

module.exports = {
  showAll,
  insert,
  update,
  del,
};
