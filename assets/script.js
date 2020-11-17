const countryApi = {
  base: "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/",
};

const stateApi = {
  base: "https://api.covidtracking.com/v1/states/",
};

// Global variable to store all data related to our charts
const charts = {
  deaths: {
    labels: [],
    values: [],
    chart: {},
  },
  cases: {
    labels: [],
    values: [],
    chart: {},
  },
  tests: {
    labels: [],
    values: [],
    chart: {},
  },
  hospitalization: {
    labels: [],
    values: [],
    chart: {},
  },
};

// Build and assign a reference to each chart
charts.deaths.chart = buildChart(document.getElementById("deaths-chart"));
charts.cases.chart = buildChart(document.getElementById("cases-chart"));
charts.tests.chart = buildChart(document.getElementById("tests-chart"));
charts.hospitalization.chart = buildChart(
  document.getElementById("hospitalization-chart")
);

let startDate = "2020-11-01";
let endDate = "2020-11-06";
let state = "CO";
// getCountryResults(startDate,endDate);
getStatesResults(state);
// function getCountryResults(startDate, endDate) {
//     fetch(`${countryApi.base}${startDate}/${endDate}`)
//     .then(countryData => {
//         return countryData.json();

//     }).then(displayResults)
// }

// Request Covid data based off of our state
function getStatesResults(state) {
  fetch(`${stateApi.base}${state}/daily.json`)
    .then((stateData) => stateData.json())
    .then((data) => {
      // sanitize our results
      // TODO: refactor function name and change how the results are returned
      const results = displayStateResults(data.reverse());

      const chart = charts.deaths.chart;
      charts.deaths.labels = results.fullDate;
      charts.deaths.values = results.fullDeath;

      chart.data.labels = charts.deaths.labels;
      chart.data.datasets[0].data = charts.deaths.values;
      chart.update();
    });
}


// Assign Event listener to the day toggler buttons
$("#day-toggle").on("click", "button", function (e) {
  const amountOfDays = $(this).val();
  console.log(amountOfDays);
  const values = charts.deaths.values;
  const labels = charts.deaths.labels;
  const chart = charts.deaths.chart;
  if (amountOfDays === "total") {
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.update();
  } else {
    const daysToDisplay = values.length - amountOfDays;
    chart.data.labels = labels.slice(daysToDisplay);
    chart.data.datasets[0].data = values.slice(daysToDisplay);
    chart.update();
  }
});

function displayStateResults(stateData) {
  let fullDate = [];
  let fullDeath = [];

  for (let i = 0; i < stateData.length; i++) {
    var date = stateData[i].date;
    var death = stateData[i].death;
    fullDate[i] = date;
    fullDeath[i] = death;
  }

  return {
    fullDate: fullDate,
    fullDeath: fullDeath,
  };
}


// Build and return a reference to a ChartJS object
function buildChart(chartElement) {
  return new Chart(chartElement, {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Cases",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
