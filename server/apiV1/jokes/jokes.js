"use strict";
/**
 * Require our Modules
 */
const jokes = require("express").Router();
const logger = require("../../utils/logger");
const passport = require("passport");
const passportController = require("../../middleware/passport/controller/passport-controller");
const controller = require("./controller/jokes-controller");

const axios = require("axios");

jokes.get("/single-random-joke", async (req, res) => {
  controller.getSingleJoke().then(
    joke => {
      // Log that single joke returned
      logger.info("Joke: Joke returned successfully: " + joke.id);

      // Return the result
      res.status(200).json(joke);
    },
    err => {
      // Log that error occurred while getting joke from external API
      logger.warn("Joke: Error occurred while getting joke from external API");

      // Return that the user is not found in the database
      res.status(500).json({
        err: "An error occurred!"
      });
    }
  );
});
jokes.get("/get-favorite-jokes", async (req, res) => {
  const jwt_token = passportController.getDecodedToken(
    req.headers.authorization
  );
  if (jwt_token) {
    controller.getFavoriteJokes(jwt_token.guid).then(
      jokes => {
        // Log that single joke returned
        logger.info("Joke: Joke set as favorite successfully: " + req.body.id);

        // Return the result
        res.status(200).json({ jokes });
      },
      err => {
        // Log that error occurred while getting joke from external API
        logger.warn(
          "Joke: Error occurred while getting joke from external API"
        );

        // Return that the user is not found in the database
        res.status(500).json({
          err: "An error occurred!"
        });
      }
    );
  } else {
    // Log that the provided username does not exist
    logger.error("Joke: User could not decoded from token");
    // Return that the user is not found
    res.status(403).json({
      err: "User not found"
    });
  }
});

jokes.post("/set-favorite-joke", async (req, res) => {
  const jwt_token = passportController.getDecodedToken(
    req.headers.authorization
  );
  if (jwt_token) {
    controller.setFavoriteJoke(jwt_token.guid, req.body).then(
      () => {
        // Log that single joke returned
        logger.info("Joke: Joke set as favorite successfully: " + req.body.id);

        // Return the result
        res.status(200).json({ msg: "Success" });
      },
      err => {
        // Log that error occurred while getting joke from external API
        logger.warn(
          "Joke: Error occurred while getting joke from external API"
        );

        // Return that the user is not found in the database
        res.status(500).json({
          err: "An error occurred!"
        });
      }
    );
  } else {
    // Log that the provided username does not exist
    logger.error("Joke: User could not decoded from token");
    // Return that the user is not found
    res.status(403).json({
      err: "User not found"
    });
  }
});

// Export the Myprofile
module.exports = jokes;
