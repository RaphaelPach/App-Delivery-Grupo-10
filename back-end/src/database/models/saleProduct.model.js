module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },   
    productId: {
      type: DataTypes.INTEGER,  
      primaryKey: true,
      foreignKey: true,

    },
    quantity: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
    },
  }, {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SaleProduct.associate = ({ Sale, Product }) => {
    Sale.belongsToMany(Product, { 
      foreignKey: 'salesId',
      as: 'products', 
      otherKey: 'productId',
      through: SaleProduct,  
    });
    
    Product.belongsToMany(Sale, { 
      foreignKey: 'productId',
      as: 'sales', // O 'as' é o nome da tabela
      otherKey: 'saleId',
      through: SaleProduct,  
    });
  }

  return SaleProduct;
}
