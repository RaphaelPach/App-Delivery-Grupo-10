const userService = require('../services/user.service');

const getSellers = async (_req, res, next) => {
  try {
    const sellers = await userService.getSellers();
    
    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (_req, res, next) => {
  try {
    const customers = await userService.getCustomers();
    
    return res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellers,
  getCustomers,
};