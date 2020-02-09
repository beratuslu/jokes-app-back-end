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
  // Get the loggedin User

  // res.status(200).json({
  //   joke: "this is my joke---"
  // });
  try {
    const response = await axios({
      url: "http://api.icndb.com/jokes/random",
      method: "get"
    });
    console.log("TCL: response", response.data.value);

    res.status(200).json(response.data.value);
  } catch (error) {
    res.status(500).json({
      err: "Something went wrong!"
    });
  }
});

// Export the Myprofile
module.exports = jokes;
