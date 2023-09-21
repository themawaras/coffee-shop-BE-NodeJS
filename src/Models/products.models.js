const db = require("../Configs/postgres");

const showAll = () => {
  const sql = 'select p.product_name as "Nama Produk", p.product_desc as "Deskripsi", p.category_id as "Kategori", p.product_stock as "Stok", p.image_id as "Gambar" from products p order by p.category_id;';
  return db.query(sql);
};

const insert = (productName, productStock, productDesc, imageId, categoryId) => {
  const sql = "insert into products (product_name, product_stock, product_desc, image_id, category_id) values ($1, $2, $3, $4, $5) returning product_name, product_stock, product_desc, image_id, category_id;";
  const values = [productName, productStock, productDesc, imageId, categoryId];
  return db.query(sql, values);
};

const update = (productName, productId) => {
  const sql = "update products set product_name = $1, updated_at = now() where product_id = $2";
  const values = [productName, productId];
  return db.query(sql, values);
};

const del = (productId) => {
  const sql = "delete from products where product_id = $1 returning product_name";
  const values = [productId];
  return db.query(sql, values);
};

const search = (productName) => {
  const sql = `select p.product_name as "Nama Produk", p.product_desc as "Deskripsi", p.category_id as "Kategori" from products p where p.product_name ilike $1 order by p.product_name  asc;`;
  const values = [`%${productName}%`];
  return db.query(sql, values);
};

module.exports = {
  showAll,
  insert,
  update,
  del,
  search,
};
