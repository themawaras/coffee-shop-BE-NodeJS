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

const update = (productName, stock, desc, category, productId) => {
  const sql = `update products set product_name = $1, product_stock = $2, product_desc = $3, category_id = $4, updated_at = now() where product_id = $5`;
  const values = [productName, stock, desc, category, productId];
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

const filter = (productName, productSize) => {
  const sql = `select 
        pd.detail_id as "ID Produk",
        p.product_name as "Nama Produk",
        p.product_desc as "Deskripsi",
        c.category_name  as "Kategori",
        pd.product_price as "Harga"
    from product_details pd
    join products p on pd.product_id = p.product_id 
    join categories c on c.category_id = p.product_id 
    where pd.product_price <= $2
    and p.product_name ilike $1
    order by pd.product_price asc
    ;`;
  const values = [`%${productName}%`, productSize];
  return db.query(sql, values);
};

const pagination = (limit, offset) => {
  const sql = `select product_name, product_desc from products limit $1 offset $2;`;
  const values = [];
  return db.query(sql, values);
};

module.exports = {
  showAll,
  insert,
  update,
  del,
  search,
  filter,
};
