const { Sale, SaleProduct } = require('../../database/models');

const createNewSale = async (obj) => {
  const newSale = await Sale.create({
    userId: obj.userId,
    sellerId: obj.sellerId,
    totalPrice: obj.totalPrice,
    deliveryAddress: obj.deliveryAddress,
    deliveryNumber: obj.deliveryNumber,
    saleDate: new Date(),
    status: 'Pendente',
  });

  await obj.products.forEach((e) => SaleProduct.create({
    saleId: newSale.id,
    productId: Number(e.id),
    quantity: Number(e.quantity),
  }));

  return newSale;
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
};
