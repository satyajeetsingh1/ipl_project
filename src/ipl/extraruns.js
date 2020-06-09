function extraruns(deliveries, matches) {
  //   console.log(matches);
  return matches
    .filter((match) => match.season === "2016")
    .map((ele) => deliveries.filter((delv) => ele.id === delv.match_id))
    .reduce((a, c) => a.concat(c), [])
    .reduce((acc, ele) => {
      // console.log(ele.bowling_team);
      if (acc[ele.bowling_team]) {
        acc[ele.bowling_team] += +ele.extra_runs;
      } else {
        acc[ele.bowling_team] = +ele.extra_runs;
      }
      return acc;
    }, {});
}
// console.log(extraruns(deliveries));

module.exports = extraruns;
