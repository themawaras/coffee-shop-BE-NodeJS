// connecting to DB
const pg = require("pg");
const { Pool } = pg;

const db = new Pool({
  host: "localhost",
  database: "coffee_shop",
  user: "thema",
  password: "admin123",
});

module.exports = db;
