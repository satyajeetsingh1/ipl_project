function fetchAndVisualizeData() {
  fetch("./data.json")
    .then((r) => r.json())
    .then(visualizeData);
}

data();

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.MatchesPlayed);
  matchesWonByTeams(data.Matcheswon);
  extraruns(data.extraruns);
  economicalbowlers(data.economical_bowlers);
  winningpervenue(data.winningpervenue);
  return;
}

function visualizeMatchesPlayedPerYear(saveMachesPlayed) {
  const seriesData = [];
  for (let year in saveMachesPlayed) {
    seriesData.push([year, saveMachesPlayed[year]]);
  }

  Highcharts.chart("matches-played", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches Played",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Years",
        data: seriesData,
      },
    ],
  });
}
function matchesWonByTeams(Matcheswon) {
  let c = Object.values(Matcheswon).reduce(
    (a, c) => a.concat(Object.keys(c)),
    []
  );
  let unique = [...new Set(c)];
  let x = unique.map((ele) => {
    let d = Object.values(Matcheswon).reduce((a, c) => {
      if (!a[ele]) {
        a[ele] = [];
        a[ele].push(c[ele] || 0);
      } else {
        a[ele].push(c[ele] || 0);
      }
      return a;
    }, {});
    d.name = ele;
    return d;
  });

  Highcharts.chart("matches-won", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches won by team per year",
    },
    subtitle: {
      text: "Source: ipl.com",
    },
    xAxis: {
      categories: [
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches won",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: "</table>",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: x.map((ele) => {
      return { name: ele.name, data: ele[ele.name] };
    }),
  });
}

function economicalbowlers(economical_bowlers) {
  let seriData = [];
  for (let i = 0; i < economical_bowlers.length; i++) {
    seriData.push([
      economical_bowlers[i].bowler,
      parseFloat(economical_bowlers[i].economy),
    ]);
  }

  Highcharts.chart("economicalbowlers", {
    chart: {
      type: "column",
    },
    title: {
      text: "Top 10 economical bowlers of selected Year",
    },
    subtitle: {
      text: "Source: ipl database",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "economy: <b>{point.y:.1f}</b>",
    },
    series: [
      {
        name: "bowler",
        data: seriData,
      },
    ],
  });
}

function extraruns(extrarun) {
  let seriData = [];
  for (let team in extrarun) {
    seriData.push([team, extrarun[team]]);
  }

  Highcharts.chart("extraruns", {
    chart: {
      type: "column",
    },
    title: {
      text: "Extra runs in 2016 by teams",
    },
    subtitle: {
      text: "Source: Ipl database",
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra runs",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "extraruns: <b>{point.y:.1f} </b>",
    },
    series: [
      {
        name: "extraruns",
        data: seriData,
      },
    ],
  });
}

function winningpervenue(winningvenue) {
  const teamName = [
    ...new Set(
      Object.values(winningvenue)
        .map((ele) => Object.keys(ele))
        .reduce((a, c) => a.concat(c), [])
    ),
  ];

  const stadium = Object.keys(winningvenue);
  const data = teamName
    .map((team) => {
      return Object.values(winningvenue).reduce((a, c) => {
        // console.log(c[team]);
        if (!a[team]) {
          a[team] = [];
          a[team].push(c[team] || 0);
        } else {
          a[team].push(c[team] || 0);
        }
        return a;
      }, {});
    })
    .map((ele) => {
      return {
        name: Object.keys(ele).join(""),
        data: Object.values(ele).reduce((a, c) => a.concat(c), []),
      };
    });
  Highcharts.chart("winningTeamPerVenue", {
    chart: {
      type: "column",
    },
    title: {
      text: "Winning per venue",
    },
    xAxis: {
      categories: stadium,
      // max: 40,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
      type: "linear",
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: "percent",
      },
    },
    series: data,
  });
}

function data() {
  const selectTag = document.getElementById("economical");
  selectTag.addEventListener("change", function () {
    const value = this.value;
    fetch(`https://ipl-dataset.herokuapp.com/economy?year=${value}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        economicalbowlers(res.economical_bowler);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
