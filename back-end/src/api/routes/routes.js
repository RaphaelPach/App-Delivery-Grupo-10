const { Router } = require('express');
const login = require('../controllers/login.controller');
const token = require('../Utils/jwt');
const products = require('../controllers/products.controller');
const verifyLoginFields = require('../middlewares/verifyLoginFields');

const routes = Router();

routes.post('/login', verifyLoginFields, login.getByEmailAndPassword);
routes.post('/register', verifyLoginFields, login.registerLogin);
routes.get('/customer/products', token.decodeToken, products.getProducts);

module.exports = routes;
