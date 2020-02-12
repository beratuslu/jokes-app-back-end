"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define(
    "Favorites",
    {
      userId: DataTypes.UUID,
      jokeId: DataTypes.INTEGER,
      joke: DataTypes.STRING
    },
    {}
  );
  Favorites.associate = function(models) {
    // associations can be defined here
  };
  return Favorites;
};
