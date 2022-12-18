const express = require('express');
const router = express.Router();
// moved POOL to module
const pool = require('../modules/pool');


router.post('/', (req, res) => {
    console.log('ROUTER.POST');
    const newTask = req.body;
    const queryText = `
    INSERT INTO "tasks" ("title", "details", "completed")
    VALUES ($1, $2, $3);
    `;

    //  ('${newTask.title}', '${newTask.details}', '${newTask.completed}');
    pool.query(queryText, [newTask.title, newTask.details, newTask.completed])
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
    let queryText = 'SELECT * from tasks ORDER BY "completed" asc;';
    pool.query(queryText)
    .then((result) => {
        console.log('Results from DB:', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Error making a DB query:', error)
        res.sendStatus(500);
    })
});


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


router.put('/completed/:id', (req, res) => {
    console.log('router.put id', req.params.id);
    console.log('router.put body', req.body.completed);
    let queryText = `UPDATE tasks SET completed='true' WHERE id=${req.params.id};`;
    pool.query(queryText)
    .then((dbResponse) => {
        console.log('dbResponse:', dbResponse);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('.put POOL error:', error);
        res.sendStatus(500);
    })
});



module.exports = router;