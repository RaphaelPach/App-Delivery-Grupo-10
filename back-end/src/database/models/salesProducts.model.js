import { DataTypes, Model } from 'sequelize';
import db from '.';

class SalesProducts extends Model {}

SalesProducts.init(
  {
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
  },
  { 
    underscored: true,
    sequelize: db,
    modelName: 'sales_products',
    timestamps: false,     
  },
);

 SalesProducts.associate = ({ Sales, Products }) => {
  Sales.belongsToMany(Products, { 
    foreignKey: 'salesId',
    as: 'products', 
    otherKey: 'productId',
    through: SalesProducts,  
  });
  
  Products.belongsToMany(Sales, { 
    foreignKey: 'productId',
    as: 'sales', // O 'as' é o nome da tabela
    otherKey: 'saleId',
    through: SalesProducts,  
  });

return SalesProducts;     
};

export default SalesProducts;