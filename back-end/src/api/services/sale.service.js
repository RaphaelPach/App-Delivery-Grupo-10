const { Sale, SaleProduct } = require('../../database/models');

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

// {
//   "userId": 3,
//   "sellerId": 2,
//   "totalPrice": 78.99,
//   "deliveryAddress": "rua de teste",
//   "deliveryNumber": 290
// }

module.exports = {
  createNewSale,
  getAllSales,
};
