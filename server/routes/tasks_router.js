const express = require('express');
const router = express.Router();
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Postgres is connected.');
});

pool.on('error', (error) => {
    console.log('Postgres Pool connection error:', error);
});


router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO "tasks" ("title", "details", "completed")
    VALUES (${newTask.title}, '${newTitle.details}', '${newTitle.completed}');
    `;
    pool.query(queryText)
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Error making insert query:', error);
        res.sendStatus(500); // 500s are server probs
    })
});

router.get('/', (req, res) => {
    let queryText = 'SELECT * from task_table;';
    pool.query(queryText)
    .then((result) => {
        console.log('Results from DB:', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Error making a DB query:', error)
        res.sendStatus(500);
    })
})


module.exports = router;