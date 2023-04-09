module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sellerId: {
        field: 'seller_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'total_price',
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'delivery_number',
      },
      saleDate: { type: Sequelize.DATE, allowNull: false, field: 'sale_date' },
      status: { type: Sequelize.STRING, allowNull: false },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  },
};
