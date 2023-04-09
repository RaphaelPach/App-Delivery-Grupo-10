module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      references: { 
        model: 'users',
        key: 'id' 
      },
    },
    sellerId: { 
      type: DataTypes.INTEGER, 
      field: 'seller_id', 
      allowNull: false, 
      references: { 
        model: 'users',
        key: 'id'
      },
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = ({ User }) => {
    Sale.belongsTo(User, {foreignKey: 'user_id', as: 'users'},
    {foreignKey: 'seller_id', as: 'users'})
  }

  return Sale;
};
