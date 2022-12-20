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
        allowNull: false,
        validate: {
          notNull: { msg: "You need to provide result_id !" }
        },
        references: { model: "results", key: "id" }
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "You need to provide team_id !" }
        },
        references: { model: "teams", key: "id" },

      },
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "You need to provide player_id !" }
        },
        references: { model: "players", key: "id" }
      },
      minute: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "You need to provide minute!" },
          min: 1,
          max: 90,
          notContains: ".",
          len: [0, 2],
        },
      },
      event: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "You need to provide event!" }
        }
      },
    }),
    {
      timestamps: false,
      freezeTableName: true
    };
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches_statistics');
  }
};