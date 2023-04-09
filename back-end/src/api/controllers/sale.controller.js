const saleService = require('../services/sale.service');

const createNewSale = async (req, res, next) => {
  try {
    const newSale = await saleService.createNewSale(req.body);

    return res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewSale,
};
