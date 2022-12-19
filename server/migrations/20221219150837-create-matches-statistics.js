'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches_statistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      result_id: {
        type: Sequelize.INTEGER,
        validate: {
          notNull: { msg: "You need to provide rsult_id !" }
        },
        references: { model: "results", key: "id" },
      },
      team_id: {
        type: Sequelize.INTEGER,
        validate: {
          notNull: { msg: "You need to provide rsult_id !" }
        },
        references: { model: "results", key: "host_id" },
        references: { model: "results", key: "guest_id" }
      },
      minute: {
        type: Sequelize.INTEGER,
        validate: {
          notNull: { msg: "You need to provide minute !" },
          min:1,
          max: 90
        },
      },
      event: {
        type: Sequelize.STRING,
        validate: {
          notNull: { msg: "You need to provide event !" }
        },
      },
    }),
    {
      timestamps: false,
      freezeTableName: true,
    };
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches_statistics');
  }
};