// SETUP DONE:
// npm init --yes
// npm install
// npm install express

// SETUP NOT YET DONE:
// npm install pg
// Anything else needed?

console.log('server.js TEST');

const express = require('express');

// If using any modules:
// let variableName = require('./modules/moduleName');

const app = express();
const port = 5001;

app.use(express.static('server/public'));
app.use(express.urlencoded());

// If using any routers, add them here

app.listen(port, () => {
    console.log('listening on port', port);
});