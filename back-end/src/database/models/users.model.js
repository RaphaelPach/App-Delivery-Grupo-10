import { DataTypes, Model } from 'sequelize';
import db from '.';
import Sales from './sales.model';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'users',
  timestamps: false,
});

User.hasMany(Sales, { foreignKey: 'user_id', as: 'Sale' });
// tem que conferir as associations dessa tabela. ass: amadeus
export default User;