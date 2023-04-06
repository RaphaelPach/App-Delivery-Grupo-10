const { Router } = require('express');
require('express-async-errors');
const login = require('../controllers/login.controller');
const loginAdmin = require('../controllers/loginAdmin.controller');
const token = require('../Utils/jwt');
const products = require('../controllers/products.controller');
const verifyLoginFields = require('../middlewares/verifyLoginFields');
const adminHandler = require('../middlewares/adminHandler');

const routes = Router();

routes.post('/login', verifyLoginFields, login.getByEmailAndPassword);
routes.post('/register', verifyLoginFields, login.registerLogin);
routes.get('/customer/products', token.decodeToken, products.getProducts);
routes.post(
  '/admin/manage',
adminHandler.registerVerifyEmail,
adminHandler.registerVerifyName,
loginAdmin.registerLoginAdmin,
);

module.exports = routes;
