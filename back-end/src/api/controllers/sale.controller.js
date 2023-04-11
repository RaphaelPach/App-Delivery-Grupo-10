const saleService = require('../services/sale.service');

const createNewSale = async (req, res, next) => {
  try {
    const newSale = await saleService.createNewSale(req.body);

    return res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const result = await saleService.getAllSales();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.getSale(id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewSale,
  getAllSales,
  getSale,
};