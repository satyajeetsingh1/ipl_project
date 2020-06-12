const Router = require("express");
const MATCHES_FILE_PATH = "./db/matches.csv";
const DELIVERIES_FILE_PATH = "./db/deliveries.csv";
const csv = require("csvtojson");

const { getTopEconomicalBowlers } = require("../db/querry");

const router = new Router();

router.get("/", async (req, res) => {
  const { year } = req.query;
  // console.log(year);
  const matches = await csv().fromFile(MATCHES_FILE_PATH);
  const deliveries = await csv().fromFile(DELIVERIES_FILE_PATH);
  const finalResult = getTopEconomicalBowlers(deliveries, matches, year);

  return res.json({
    economical_bowler: finalResult, //
  });
});

module.exports = router;
