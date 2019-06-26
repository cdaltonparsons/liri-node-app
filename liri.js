require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);
var operator;
var answer;

inquirer
  .prompt([
    {
      type: "list",
      message: "Hello, welcome to Liri.  What can I help you with?",
      choices: [
        "spotify-this-song",
        "concert-this",
        "movie-this",
        "do-what-it-says"
      ],
      name: "action"
    },
    {
      type: "input",
      when: function(userInput) {
        return userInput.action !== "do-what-it-says";
      },
      message:
        "And what song, band, or movie would you like me to look up? (Please no special characters, i.e. periods (.) or apostrophes ('))",
      name: "thing"
    }
  ])
  .then(function(userInput) {
    operator = userInput.action;
    answer = userInput.thing;
    switchCase(operator, answer);
  });
function switchCase(operator, answer) {
  switch (operator) {
    case "concert-this":
      return concertThis(answer);
    case "spotify-this-song":
      return spotifyThis(answer);
    case "movie-this":
      return movieThis(answer);
    case "do-what-it-says":
      return doWhat();
    default:
      return console.log("Choose a valid action.");
  }
}

function concertThis(answer) {
  var moment = require("moment");
  var queryUrlBands =
    "https://rest.bandsintown.com/artists/" +
    answer +
    "/events?app_id=codingbootcamp";
  axios.get(queryUrlBands).then(function(response) {
    console.log(
      "\nYour favorite band, " +
        answer +
        ", is playing at " +
        response.data[0].venue.name +
        " in " +
        response.data[0].venue.city +
        " on " +
        moment(response.data[0].datetime).format("MM/DD/YYYY") +
        "\n"
    );
  });
}

function spotifyThis(answer) {
  if (answer) {
    spotify.search({ type: "track", query: answer }, function(err, response) {
      if (err) {
        return console.log("Error occurred: " + err);
      } else {
        console.log(
          "\nThe song " +
            answer +
            " is by: " +
            response.tracks.items[0].artists[0].name
        );
        console.log("\n");
        console.log("The track name is: " + response.tracks.items[0].name);
        console.log("\n");
        console.log(
          "Here's a link to the song on spotify: " +
            response.tracks.items[0].external_urls.spotify
        );
        console.log("\n");
        console.log(
          "It appears on the album: " +
            response.tracks.items[0].album.name +
            "\n"
        );
        return;
      }
    });
  } else {
    spotify.search({ type: "track", query: "the sign" }, function(
      err,
      response
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      } else {
        console.log(
          "\nYou forgot to input a song, so here is information on my favorite song, 'The Sign is by: " +
            response.tracks.items[5].artists[0].name
        );
        console.log("\n");
        console.log("The track name is: " + response.tracks.items[5].name);
        console.log("\n");
        console.log(
          "Here's a link to the song on spotify: " +
            response.tracks.items[5].external_urls.spotify
        );
        console.log("\n");
        console.log(
          "It appears on the album: " +
            response.tracks.items[5].album.name +
            "\n"
        );
      }
    });
  }
}

function movieThis(answer) {
  if (answer) {
    var queryUrlMovies =
      "http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrlMovies).then(function(response) {
      console.log("\n");
      console.log(
        `The movie name is ${response.data.Title}, it was released in ${
          response.data.Year
        }.  It has an IMDB rating of ${
          response.data.imdbRating
        }, and a Rotten Tomato rating of ${
          response.data.Ratings[1].Value
        }.  It was produced in ${
          response.data.Country
        }, and the spoken language in the movie is ${response.data.Language}.`
      );
      console.log("\n");
      console.log(`Here's a brief plot summary: ${response.data.Plot}`);
      console.log("\n");
      console.log(`Headlining actors: ${response.data.Actors}`);
    });
  } else {
    var queryUrlMovies =
      "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
    axios.get(queryUrlMovies).then(function(response) {
      console.log(
        "\nYou forgot to enter a movie title, so here's some information on a movie I've never heard of"
      );
      console.log(
        `The movie name is ${response.data.Title}, it was released in ${
          response.data.Year
        }.  It has an IMDB rating of ${
          response.data.imdbRating
        }, and a Rotten Tomato rating of ${
          response.data.Ratings[1].Value
        }.  It was produced in ${
          response.data.Country
        }, and the spoken language in the movie is ${response.data.Language}.`
      );
      console.log("\n");
      console.log(`Here's a brief plot summary: ${response.data.Plot}`);
      console.log("\n");
      console.log(`Headlining actors: ${response.data.Actors}`);
    });
  }
}

function doWhat() {
  fs.readFile("random.txt", "utf8", function(err, response) {
    if (err) {
      return console.log("Error occured: " + err);
    }
    var text = response.split(",");
    operator = text[0];
    answer = text[1];
    switch (operator) {
      case "concert-this":
        return concertThis(answer);
      case "spotify-this-song":
        return spotifyThis(answer);
      case "movie-this":
        return movieThis(answer);
      case "do-what-it-says":
        return doWhat();
      default:
        return console.log("Choose a valid action.");
    }
  });
}
