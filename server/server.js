// SETUP DONE:
// npm init --yes
// npm install
// npm install express
// npm install pg
// stole koala favicon


// @ END OF MONDAY:
// Database POST/GET all working
// NEXT STEPS:
// Make complete/delete btns work, use CSS to change 'completed' look
// will need to read/edit COMPLETED boolean values in DB using PUT


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