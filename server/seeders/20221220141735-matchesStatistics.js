'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("matches_statistics", [
      {
        result_id: 1,
        team_id: 2,
        player_id: 3,
        minute: 23,
        event: "Penalty"
      },
      {
        result_id: 1,
        team_id: 2,
        player_id: 3,
        minute: 23,
        event: "Goal"
      },
      {
        result_id: 1,
        team_id: 2,
        player_id: 3,
        minute: 22,
        event: "Yellow Card"
      },
      {
        result_id: 1,
        team_id: 1,
        player_id: 3,
        minute: 66,
        event: "Penalty"
      },
      {
        result_id: 1,
        team_id: 2,
        player_id: 3,
        minute: 23,
        event: "Penalty"
      },
      {
        result_id: 1,
        team_id: 2,
        player_id: 3,
        minute: 23,
        event: "Penalty"
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
