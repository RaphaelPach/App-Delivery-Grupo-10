module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  User.associate = ({ Sale }) => {
    User.hasMany(Sale,
      { foreignKey: 'user_id', as: 'sales-users' });

    User.hasMany(Sale,
      { foreignKey: 'seller_id', as: 'sales-sellers' });
  };

  return User;
};
