const pool = require("./config/db");

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

testDB();