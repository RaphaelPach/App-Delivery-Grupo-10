const { Router } = require('express');
require('express-async-errors');
const login = require('../controllers/login.controller');
const loginAdmin = require('../controllers/loginAdmin.controller');
const token = require('../Utils/jwt');
const products = require('../controllers/products.controller');
const users = require('../controllers/user.controller');
const sales = require('../controllers/sale.controller');
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

routes.get('/customers', users.getCustomers);
routes.get('/sellers', users.getSellers);

routes.post('/newSale', token.decodeToken, sales.createNewSale);

routes.get('/sales', sales.getAllSales);
routes.get('/sales/:id', sales.getSale);

routes.post('/seller/sales', sales.getSaleBySellerId);

module.exports = routes;
