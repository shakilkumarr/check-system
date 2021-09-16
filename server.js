const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./services/routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3000;

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  
  server.use('/api', apiRouter);
  server.get('*', (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
})
