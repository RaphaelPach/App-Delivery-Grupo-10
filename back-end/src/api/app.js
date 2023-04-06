const express = require('express');
require('express-async-errors');
const cors = require('cors');
const routes = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

module.exports = app;
