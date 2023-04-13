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

// const getTudo = async (id) => {
//   let array = [ ]
//   const sale = await SaleProduct.findAll({ where: { saleId: id } })
//   sale.forEach(async (e) => {
//     const product = await Product.findOne({ where: { id: e.productId } })
//     const sale = await Sale.findOne({ where: { id: e.saleId } })
//     const user = await User.findOne({ where: { id: sale.sellerId } })
//     const obj = {
//       saleId = sale.id,
//       quantity: e.quantity,
//       price: product.price,
//       totalPrice: sale.totalPrice,
//       saleDate: sale.saleDate,
//       status: sale.status,
//       sellerName: user.name,
//       name: product.name,
//     }
//     array.push(obj)
//   })
//   return array;
// }

const getSaleBySellerId = async (id) => {
  const sales = await Sale.findAll({ where: { sellerId: id } });

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
  getSaleBySellerId,
  createNewSale,
  getAllSales,
  getSaleById,
};
