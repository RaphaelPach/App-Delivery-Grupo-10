const express = require('express');
const routes = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(express.json());
app.use(routes);
app.use(errorHandler);

module.exports = app;
