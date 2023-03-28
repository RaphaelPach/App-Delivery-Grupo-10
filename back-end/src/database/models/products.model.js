import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class Products extends Model {}

Products.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: STRING,
  },
  price: {
    allowNull: false,
    type: DECIMAL(4, 2),
  },
  urlImage: {
    allowNull: true,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'products',
  timestamps: false,
});

export default Products;