"use strict";
/**
 * Require our modules
 */
const axios = require("axios");
const Op = require("sequelize").Op; // @TODO: Verify for docker-compose
const models = require("../../../../database/models");
const Favorites = models.Favorites;

module.exports = {
  // Verify if a username or email is found in the database
  getSingleJoke: () => {
    return new Promise(async (resolve, reject) => {
      // Get joke from external api
      try {
        const response = await axios({
          url: "http://api.icndb.com/jokes/random",
          method: "get"
        });
        resolve(response.data.value);
      } catch (error) {
        reject();
      }
    });
  },
  setFavoriteJoke: (userId, joke) => {
    return new Promise(async (resolve, reject) => {
      Favorites.create({
        userId,
        jokeId: joke.id,
        joke: joke.joke
      }).then(
        params => {
          //success
          resolve();
        },
        err => {
          // Could not Query
          reject();
        }
      );
    });
  },
  deleteFavoriteJoke: (userId, jokeId) => {
    return new Promise(async (resolve, reject) => {
      Favorites.destroy({
        where: {
          userId,
          jokeId: Number(jokeId)
        }
      }).then(
        params => {
          //success
          resolve();
        },
        err => {
          console.log("TCL: err", err);
          // Could not Query
          reject();
        }
      );
    });
  },
  getFavoriteJokes: (userId, joke) => {
    return new Promise(async (resolve, reject) => {
      Favorites.findAll({
        raw: true,
        where: {
          userId
        }
      }).then(
        data => {
          //success
          resolve(data);
        },
        err => {
          reject();
        }
      );
    });
  }
};
