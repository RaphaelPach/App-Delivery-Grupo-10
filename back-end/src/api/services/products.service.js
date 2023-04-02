const { Product } = require('../../database/models');

const getProducts = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  getProducts,
};
