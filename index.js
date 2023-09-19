const express = require("express");

// generate express application
const server = express();

// parser for  json & form url encoded
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// port for express application
server.listen(8000, () => {
  console.log("server is running on port 8000");
});

// connecting to DB
const pg = require("pg");
const { Pool } = pg;

const db = new Pool({
  host: "localhost",
  database: "coffee_shop",
  user: "thema",
  password: "admin123",
});

// handler untuk req

// handler product
server.get("/", (req, res, next) => {
  res.send("Welcome to Fazz Coffee Shop!");
});

server.get("/products", async (req, res, next) => {
  try {
    const result = await db.query('select p.product_name as "Nama Produk", p.product_desc as "Deskripsi", p.category_id as "Kategori", p.product_stock as "Stok", p.image_id as "Gambar" from products p order by p.category_id;');
    res.status(200).json({
      msg: "Success data retrieve",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.post("/product", (req, res) => {
  const { body } = req;
  const sql = "insert into products (product_name, product_stock, product_desc, image_id, category_id) values ($1, $2, $3, $4, $5) returning product_name, product_stock, product_desc, image_id, category_id;";
  const values = [body.product_name, body.product_stock, body.product_desc, body.image_id, body.category_id];

  db.query(sql, values)
    .then((data) => {
      res.status(201).json({
        msg: "Product input success",
        result: data.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "Internal server error",
      });
    });
});

server.patch("/product/:product_id", async (req, res) => {
  try {
    const { body, params } = req;
    const sql = "update products set product_name = $1, updated_at = now() where product_id = $2";
    const values = [body.product_name, params.product_id];
    await db.query(sql, values);

    res.status(200).json({
      msg: `Nama produk untuk id ${params.product_id} berubah menjadi ${body.product_name}`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.delete("/product/:product_id", async (req, res) => {
  try {
    const { params } = req;
    const sql = "delete from products where product_id = $1 returning product_name";
    const values = [params.product_id];
    const data = await db.query(sql, values);

    res.status(200).json({
      msg: `Produk dengan nama ${data.rows[0].product_name} pada id = ${params.product_id} berhasil dihapus.`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

// handler promos
server.get("/promos", async (req, res) => {
  try {
    const sql = `select promo_id as "No ID", promo_name as "Nama Promo" from promos order by promo_id asc`;
    const data = await db.query(sql);
    res.status(200).json({
      msg: "Success data retrieve",
      result: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.post("/promo", async (req, res) => {
  try {
    const { body } = req;
    const sql = "insert into promos (promo_name, promo_desc, promo_type, promo_flat, promo_percent) values ($1, $2, $3, $4, $5) returning promo_id, promo_name, promo_desc, promo_type, promo_flat, promo_percent";
    const values = [body.promo_name, body.promo_desc, body.promo_type, body.promo_flat, body.promo_percent];
    const data = await db.query(sql, values);

    res.status(201).json({
      msg: "Promo input success",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.patch("/promo/:promo_id", async (req, res) => {
  try {
    const { body, params } = req;
    const sql = `update promos set promo_name = $1, promo_desc = $2, promo_type = $3, promo_flat = $4, promo_percent = $5, updated_at = now() where promo_id = $6 returning promo_id, promo_name, promo_desc, promo_type, promo_flat, promo_percent;`;
    const values = [body.promo_name, body.promo_desc, body.promo_type, body.promo_flat, body.promo_percent, params.promo_id];
    const data = await db.query(sql, values);

    res.status(200).json({
      msg: `Nama promo ${body.promo_name} berhasil diubah`,
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.delete("/promo/:promo_id", async (req, res) => {
  try {
    const { params } = req;
    const sql = `delete from promos where promo_id = $1 returning promo_name`;
    const values = [params.promo_id];
    const data = await db.query(sql, values);

    res.status(200).json({
      msg: `Promo dengan nama ${data.rows[0].promo_name} pada id = ${params.promo_id} berhasil dihapus.`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.get("/users", async (req, res) => {
  try {
    const sql = `select user_id as "User ID", user_fullname as "Nama Lengkap", user_email as "Email", user_phone as "No Telp", user_address as "Alamat" from users order by user_id asc`;
    const data = await db.query(sql);

    res.status(200).json({
      msg: "Success data retrieve",
      result: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.post("/user", async (req, res) => {
  try {
    const { body } = req;
    const sql = `insert into users (user_fullname, user_email, user_phone, user_password, user_address, user_admin) values ($1, $2, $3, $4, $5, $6) returning user_id, user_fullname, user_email, user_phone, user_address, user_admin`;
    const values = [body.user_fullname, body.user_email, body.user_phone, body.user_password, body.user_address, body.user_admin];
    const data = await db.query(sql, values);

    res.status(201).json({
      msg: "Success input user",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.patch("/user/:user_id", async (req, res) => {
  try {
    const { body, params } = req;
    const sql = `update users set user_fullname = $1, user_address = $2, updated_at = now() where user_id = $3 returning user_fullname, user_email, user_phone, user_address`;
    const values = [body.user_fullname, body.user_address, params.user_id];
    const data = await db.query(sql, values);

    res.status(200).json({
      msg: `Data user ${body.user_fullname} berhasil diubah`,
      result: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.delete("/user/:user_id", async (req, res) => {
  try {
    const { params } = req;
    const sql = `delete from users where user_id = $1 returning user_fullname`;
    const values = [params.user_id];
    const data = await db.query(sql, values);

    res.status(200).json({
      msg: `Data user dengan nama ${data.rows[0].user_name}, dengan ID = ${params.user_id} berhasil dihapus`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

// handler ORDERS
server.get("/orders", async (req, res) => {
  try {
    const sql = `select order_id as "Order ID", user_id as "User ID", order_shipping as "Jenis", order_status as "Status", order_total as "Total", payment_id as "ID Pembayaran", created_at as "Dibuat Tgl" from orders order by created_at`;
    const data = await db.query(sql);

    res.status(200).json({
      msg: "Orders data retrieve",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.post("/order", async (req, res) => {
  try {
    const { body } = req;
    const sql = `insert into orders (user_id, order_shipping, order_status, order_total, payment_id) values ($1, $2, $3, $4, $5) returning user_id, order_shipping, order_status, order_total, payment_id`;
    const values = [body.user_id, body.order_shipping, body.order_status, body.order_total, body.payment_id];
    const data = await db.query(sql, values);

    res.status(201).json({
      msg: "Success input data order",
      result: data.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.patch("/order/:order_id", async (req, res) => {
  try {
    const { body, params } = req;
    const sql = `update orders set user_id = $1, order_shipping = $2, order_status = $3, order_total = $4, payment_id = $5, updated_at = now() where order_id = $6 returning order_id, user_id, order_shipping, order_status, order_total, payment_id`;
    const values = [body.user_id, body.order_shipping, body.order_status, body.order_total, body.payment_id, params.order_id];
    const data = await db.query(sql, values);

    res.status(200).json({
      msg: `Data order dengan ID = ${params.order_id} berhasil diubah`,
      result: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

server.delete("/order/:order_id", async (req, res) => {
  try {
    const { params } = req;
    const sql = `delete from orders where user_id = $1 returning order_id, user_id, order_shipping, order_status, order_total, payment_id`;
    const values = [params.order_id];
    const data = await db.query(sql, values);

    res.status(200).json({
      msg: `Data order dengan id ${params.order_id} berhasil dihapus`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal sever error",
    });
  }
});
