const csv = require("csvtojson");
const fs = require("fs");
const matchesplayed = require("./ipl/matchesplayed.js");
const matcheswon = require("./ipl/matcheswon.js");
const extraruns = require("./ipl/extraruns.js");
const economicalbowlers = require("./ipl/economicalbowlers.js");
const winningpervenue = require("./ipl/winningpervenue.js");
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then((deliveries) => {
          // console.log(deliveries.slice(20,25));
          // console.log(matches);
          let result = [];

          result.push(matchesplayed(matches));
          result.push(matcheswon(matches));
          result.push(extraruns(deliveries, matches));
          // console.log(economicalbowlers(deliveries,matches));
          result.push(economicalbowlers(deliveries, matches, "2008"));
          result.push(winningpervenue(matches));
          saveMachesPlayed(result);
          // console.log(result[4]);
        });
    });
}
function saveMachesPlayed(result) {
  const jsonData = {
    MatchesPlayed: result[0],
    Matcheswon: result[1],
    extraruns: result[2],
    economical_bowlers: result[3],
    winningpervenue: result[4],
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
