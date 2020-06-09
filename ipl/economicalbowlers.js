function economicalbowlers(deliveries, matches) {
  let ecoarray = [];

  let finalarr = [];
  let result = matches
    .filter((matches) => matches.season === "2015")
    .map((ele) => deliveries.filter((delv) => ele.id === delv.match_id))
    .reduce((a, el) => a.concat(el), [])
    .reduce((acc, ele) => {
      if (acc[ele.bowler]) {
        acc[ele.bowler].bowl += 1;
        acc[ele.bowler].runs += +ele.total_runs;
      } else {
        acc[ele.bowler] = {};
        acc[ele.bowler].bowl = 1;
        acc[ele.bowler].runs = +ele.total_runs;
      }
      return acc;
    }, {});
//   console.log(Object.entries(result).reduce((a, el) => a.concat(el), [])[177]);

  for (let bowler in result) {
    // if (result[bowler].bowl > 6) {
      result[bowler].economy = (
        result[bowler].runs /
        (result[bowler].bowl / 6)
      ).toFixed(2);
      ecoarray.push(result[bowler].economy);
    }
//   }
  ecoarray.sort((a, b) => a - b);
  for (let bowlers in result) {
    if (result[bowlers].economy <= +ecoarray[9]) {
      let finalobj = {};
      finalobj.bowler = Object.values(bowlers).join("");
      finalobj.economy = result[bowlers].economy;
      finalarr.push(finalobj);
      //   console.log(result[bowlers].economy);
    }
  }
    // console.log(finalarr);
  return finalarr;
}

module.exports = economicalbowlers;
