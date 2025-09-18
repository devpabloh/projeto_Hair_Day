const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'server.json'));
const middlewares = jsonServer.defaults();

// Enable CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// Default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

server.use(jsonServer.bodyParser);
server.use('/api', router);

module.exports = server;
