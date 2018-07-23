const http = require('http');
const app = require('./app.js');
const config = require('./config/common');

const port = config.port;
const server = http.createServer(app);

server.listen(port);
console.log(`Application is listening on port ${port}`);
