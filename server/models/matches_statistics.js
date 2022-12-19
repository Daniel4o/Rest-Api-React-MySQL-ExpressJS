'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matches_statistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  matches_statistics.init({
    result_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    minute: DataTypes.INTEGER,
    event: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'matches_statistics',
  });
  return matches_statistics;
};