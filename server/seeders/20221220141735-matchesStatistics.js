'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("matches_statistics", [
      {
        result_id: 1,
        team_id: 1,
        player_id: 3,
        minute: 23,
        event: "Penalty"
      },
      {
        result_id: 1,
        team_id: 1,
        player_id: 3,
        minute: 23,
        event: "Goal"
      },
      {
        result_id: 1,
        team_id: 2,
        player_id: 15,
        minute: 22,
        event: "Yellow Card"
      },
      {
        result_id: 1,
        team_id: 2,
        player_id: 22,
        minute: 66,
        event: "Penalty"
      },
      {
        result_id: 1,
        team_id: 1,
        player_id: 4,
        minute: 23,
        event: "Yellow Card"
      },
      {
        result_id: 1,
        team_id: 2,
        player_id: 13,
        minute: 23,
        event: "Yellow Card"
      },
      {
        result_id: 1,
        team_id: 1,
        player_id: 4,
        minute: 75,
        event: "Yellow Card"
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
