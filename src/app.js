if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const accessLogMiddleware = require('./middleware/accessLogMiddleware');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use('/rates', accessLogMiddleware);
app.use(routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
