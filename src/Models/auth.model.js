const db = require("../Configs/postgres");

const createUser = (UserFullname, userEmail, userPhone, userPassword, userAddress) => {
  const sql = `insert into users (user_fullname, user_email, user_phone, user_password, user_address, user_admin) values ($1, $2, $3, $4, $5, $6) returning user_id, user_fullname, user_email, user_phone, user_address`;
  const values = [UserFullname, userEmail, userPhone, userPassword, userAddress];
  return db.query(sql, values);
};

const getPwd = (email) => {
  const sql = `select user_password, user_id as "ID", user_fullname as "userName", user_admin as "isAdmin" from users where user_email = $1`;
  const values = [email];
  return db.query(sql, values);
};

module.exports = { createUser, getPwd };
