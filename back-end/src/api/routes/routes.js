const { Router } = require('express');
const login = require('../controllers/login.controller');
const verifyLoginFields = require('../middlewares/verifyLoginFields');

const routes = Router();

routes.post('/login', verifyLoginFields, login);

module.exports = routes;
