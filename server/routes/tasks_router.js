const express = require('express');
const router = express.Router();
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    database: 'tasks',  // make sure this is db name, not table name
    host: 'localhost',
    port: 5432,  // host and port info seen in Postico
    max: 10,  // max number of queries/connections to db that can be made at once
    idleTimeoutMillis: 30000  // 30000 millis is 30 seconds
});

pool.on('connect', () => {
    console.log('Postgres is connected.');
});

pool.on('error', (error) => {
    console.log('Postgres Pool connection error:', error);
});





module.exports = router;