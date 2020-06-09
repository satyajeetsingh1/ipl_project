function matchesPlayed(ele) {
  return ele.reduce((acc, ele) => {
    const season = ele.season;
    if (acc[season]) {
      acc[season] += 1;
    } else {
      acc[season] = 1;
    }
    return acc;
  }, {});
}
module.exports = matchesPlayed;
