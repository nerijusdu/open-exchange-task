if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
