'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teams', [{
      team_name: 'Man United', formation: "4-4-2"
    }, {
      team_name: 'Liverpool', formation: "4-4-2"
    }, {
      team_name: 'Chelsea', formation: "4-4-2"
    }, {
      team_name: 'Tottenham', formation: "4-4-2"
    }, {
      team_name: 'Manchester City', formation: "4-4-2"
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  }
};
