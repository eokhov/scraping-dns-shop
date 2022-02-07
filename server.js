const http = require('http');
const app = require('./app.js');
const http_port = 3000;

const server = http.createServer(app);

server.listen(http_port, err => {
  if (err) throw err;

  console.log(`HTTP server run on port ${http_port}`);
});
