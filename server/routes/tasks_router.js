const express = require('express');
const router = express.Router();
// const pg = require('pg');
// const Pool = pg.Pool;
const pool = require('../modules/pool');

// const pool = new Pool({
//     database: 'weekend-to-do-app',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000
// });

// pool.on('connect', () => {
//     console.log('Postgres is connected.');
// });

// pool.on('error', (error) => {
//     console.log('Postgres Pool connection error:', error);
// });


router.post('/', (req, res) => {
    console.log('ROUTER.POST');
    const newTask = req.body;
    const queryText = `
    INSERT INTO "tasks" ("title", "details", "completed")
    VALUES ('${newTask.title}', '${newTask.details}', '${newTask.completed}');
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
    console.log('ROUTER.GET');
    let queryText = 'SELECT * from tasks;';
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

// BELOW IS FOR USING ID
// NOT WORKING
// GET gets 404 NOT FOUND in POSTMAN
// DELETE BTN gives 404 NOT FOUND ERROR in CONSOLE
// DELETE logs tdo not show up in TERMINAL

router.get('/:id', (req, res) => {
    console.log('ROUTER.GET W/ID');
    console.log('r.get BY ID:', req.params.id);   // whatever was passed in
    const queryText = `SELECT * FROM tasks WHERE id = ${req.params.id};`;
    pool.query(queryText)
    .then((result) => {
        console.log('r.get BY ID - RESULT:', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Error making a DB query:', error);
        res.sendStatus(500);
    })
});


router.delete('/:id', (req, res) => {
    console.log('ROUTER.DELETE');
    console.log('r.delete ID:', req.params.id);   // whatever was passed in
    const queryText = `DELETE FROM tasks WHERE id = ${req.params.id};`;
    pool.query(queryText)
    .then((result) => {
        console.log('r.delete RESULT:', result);
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log('Error making a deletion:', error);
        res.sendStatus(500);
    })
});


module.exports = router;