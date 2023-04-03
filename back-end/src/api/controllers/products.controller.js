const productsService = require('../services/products.service');

const getProducts = async (req, res, next) => {
  try {
    const products = await productsService.getProducts();

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
};
