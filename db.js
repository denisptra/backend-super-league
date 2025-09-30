const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",       // kosong kalau default XAMPP
  database: "mydb",   // sesuai DB yang ada di phpMyAdmin
  port: 3306          // default MySQL
});

module.exports = pool;
