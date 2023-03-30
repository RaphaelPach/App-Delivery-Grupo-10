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
    totalPriece: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    deliveryAdrees: {
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

  return Sale;
};
