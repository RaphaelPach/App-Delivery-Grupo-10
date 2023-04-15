const { Sale, SaleProduct, User, Product } = require('../../database/models');

const createNewSale = async (obj) => {
  const novaData = new Date();

  const newSale = await Sale.create({
    userId: obj.userId,
    sellerId: obj.sellerId,
    totalPrice: obj.totalPrice,
    deliveryAddress: obj.deliveryAddress,
    deliveryNumber: obj.deliveryNumber,
    saleDate: novaData,
    status: 'Pendente',
  });

  await obj.products.forEach((e) => SaleProduct.create({
    saleId: newSale.id,
    productId: Number(e.id),
    quantity: Number(e.quantity),
  }));

  return newSale;
};

const getAllSales = async () => {
  const sales = await Sale.findAll();

  return sales;
};

const getSaleQuery = {
  attributes: ['id', ['sale_date', 'saleDate'], 'status', ['total_price', 'totalPrice']],
  include: [
    {
      model: User, 
      as: 'seller',
      attributes: ['name'],
      required: true,
    },
    {
      model: Product,
      as: 'products',
      attributes: ['name', 'price'],
      through: { attributes: ['quantity'] },
      required: true,
    },
  ],
};

const getSaleById = async (id) => {
  const sale = await Sale.findByPk(id, getSaleQuery);
  return sale;
};

const getSaleBySellerId = async (id) => {
  const sales = await Sale.findAll({ where: { sellerId: id } });

  return sales;
};

const updateSaleStatus = async (id, status) => {
  await Sale.update({ status }, { where: { id } });
  const updatedStatus = await Sale.findByPk(id, { attributes: ['status'] });
  return updatedStatus;
};

module.exports = {
  getSaleBySellerId,
  createNewSale,
  getAllSales,
  getSaleById,
  updateSaleStatus,
};
