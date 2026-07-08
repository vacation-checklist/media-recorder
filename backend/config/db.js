const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "media_recorder",
  password: "Welc@2026", 
  port: 5432,
});

module.exports = pool;