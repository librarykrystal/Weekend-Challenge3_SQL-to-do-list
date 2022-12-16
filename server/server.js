// SETUP DONE:
// npm init --yes
// npm install
// npm install express
// npm install pg
// stole koala favicon

//console.log('server.js TEST');

const express = require('express');
const router = require('./routes/tasks_router')
// If using any modules:    let variableName = require('./modules/moduleName');
const app = express();
const port = 5001;

app.use(express.static('server/public'));
app.use(express.urlencoded());
app.use('/tasks_router', router);

app.listen(port, () => {
    console.log('listening on port', port);
});