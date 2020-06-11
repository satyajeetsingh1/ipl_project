// const csv = require("csvtojson");
const data = require("./data.json");
const economicalbowlers = require("./economicalbowlers");


module.exports.getTopEconomicalBowlers = function (deliveries, matches, year) {
  const arr = economicalbowlers(deliveries, matches, year);
 
  return (data.economical_bowlers = arr);
};
