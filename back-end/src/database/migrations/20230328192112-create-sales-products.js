module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales_products", {
      saleId: {
        type: Sequelize.INTEGER,
        field: "sale_id",
        primaryKey: true,
        references: {
          model: "sales",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.INTEGER,
        field: "product_id",
        primaryKey: true,
        foreignKey: true,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("sales_products");
  },
};
