require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);


var action = process.argv[2];

var thing = process.argv.slice(3).join(" ");


function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + thing + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(function(err, response) {
        if (err) {
            console.log(err)
        }

    })

};
concertThis();
function spotifyThis() {

};

function movieThis() {

};

function doWhat() {

}



// switch (action) {
//     case "concert-this":
//       return console.log("bands in town response");
//     case "spotify-this-song":
//       return console.log("spotify response");
//     case "movie-this":
//       return console.log("omdb response");
//     case "do-what-it-says":
//       return console.log("do what it says")
//     default:
//       return console.log("Choose a valid action.");
//   };