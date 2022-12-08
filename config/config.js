require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'mygram',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'mygram_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
  },
};
