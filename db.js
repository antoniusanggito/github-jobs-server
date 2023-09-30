const dbConfig = require('./app/config/db.config');
const Pool = require('pg').Pool;

const pool = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
  port: dbConfig.PORT,
});

module.exports = pool;
