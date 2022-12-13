// SETUP DONE:
// npm init --yes
// npm install
// npm install express
// npm install pg
// stole koala favicon

// Anything else needed?

//console.log('server.js TEST');

const express = require('express');

// If using any modules:    let variableName = require('./modules/moduleName');

const app = express();
const port = 5001;

app.use(express.static('server/public'));
app.use(express.urlencoded());

// If using routers, add them here
let tasksRouter = require('./routes/tasks_router');
app.use('/songs', tasksRouter);

app.listen(port, () => {
    console.log('listening on port', port);
});