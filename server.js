const http = require('http')
const migration = require('./electron/data/migration')
const { requestListener } = require('./electron/http-handler')

migration();

// const hostname = '127.0.0.1';
// const port = 8080;

// const server = http.createServer(requestListener);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });