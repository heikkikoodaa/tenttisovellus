const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: process.env.REACT_APP_DB, // Tiedot tulevat .env filusta
  password: process.env.REACT_APP_DB_PASSWORD,
  port: process.env.REACT_APP_DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
  connect: () => pool.connect(),
};
