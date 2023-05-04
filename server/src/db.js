const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USERNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
    host: process.env.HOST
})

module.exports = pool;