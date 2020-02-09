'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    jokeId: DataTypes.INTEGER,
    joke: DataTypes.STRING
  }, {});
  Favorites.associate = function(models) {
    // associations can be defined here
  };
  return Favorites;
};