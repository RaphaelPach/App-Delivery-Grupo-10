import { DataTypes, Model } from 'sequelize';
import db from '.';

class Sales extends Model {}

Sales.init({
  id: { allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
  },
  sellerId: { field: 'sales_products', 
    allowNull: false, 
    type: DataTypes.INTEGER, 
    references: { 
    model: 'products',
    key: 'id' },
  },
  totalPriece: {
    type: DataTypes.FLOAT(9, 2),
  },
  deliveryAdrees: {
    type: DataTypes.STRING,
  },
  deliveryNumber: {
    type: DataTypes.NUMBER,
  },
  saleDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.DATE,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'sales',
  timestamps: false,
});

export default Sales;