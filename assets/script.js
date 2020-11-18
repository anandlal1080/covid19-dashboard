const stateApi = {
  base: "https://api.covidtracking.com/v1/states/",
};

// Global variable to store all data related to our charts
const charts = {
  deaths: {
    labels: [],
    values: [],
    chart: {},
    label: "# of Deaths",
  },
  cases: {
    labels: [],
    values: [],
    chart: {},
    label: "# of Cases",
  },
  tests: {
    labels: [],
    values: [],
    chart: {},
    label: "# of Tests",
  },
  hospitalization: {
    labels: [],
    values: [],
    chart: {},
    label: "# of Hospitalizations",
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
      chart.data.datasets[0].label = charts.deaths.label;
      
      const chartCases = charts.cases.chart;
      charts.cases.labels = results.fullDate;
      charts.cases.values = results.fullCases;
      
      chartCases.data.labels = charts.cases.labels;
      chartCases.data.datasets[0].data = charts.cases.values;
      chartCases.data.datasets[0].label = charts.cases.label;

      const testCases = charts.tests.chart;
      charts.tests.labels = results.fullDate;
      charts.tests.values = results.fullTests;
      
      testCases.data.labels = charts.tests.labels;
      testCases.data.datasets[0].data = charts.tests.values;
      testCases.data.datasets[0].label = charts.tests.label;

      const hospCases = charts.hospitalization.chart;
      charts.hospitalization.labels = results.fullDate;
      charts.hospitalization.values = results.fullHosp;
      
      hospCases.data.labels = charts.hospitalization.labels;
      hospCases.data.datasets[0].data = charts.hospitalization.values;
      hospCases.data.datasets[0].label = charts.hospitalization.label;

      chart.update();
      chartCases.update();
      testCases.update();
      hospCases.update();
      console.log();
    });
}


// Assign Event listener to the day toggler buttons
$("#day-toggle").on("click", "button", function (e) {
  const amountOfDays = $(this).val();
  console.log(amountOfDays);
  const values = charts.deaths.values;
  const casesvalues = charts.cases.values;
  const casesLabels = charts.cases.labels;
  const testsvalues = charts.tests.values;
  const testsLabels = charts.tests.labels;
  const labels = charts.deaths.labels;
  const chart = charts.deaths.chart;
  const chartCases = charts.cases.chart;
  const testCases = charts.tests.chart;
  const hospCases = charts.hospitalization.chart;
  const hospvalues = charts.hospitalization.values;
  const hospLabels = charts.hospitalization.labels;

  if (amountOfDays === "total") {
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chartCases.data.labels = casesLabels;
    chartCases.data.datasets[0].data = casesvalues;
    testCases.data.datasets[0].data = testsvalues;
    testCases.data.labels = testsLabels;
    hospCases.data.datasets[0].data = hospvalues;
    hospCases.data.labels = hospLabels;


    chart.update();
    chartCases.update();
    testCases.update();
    hospCases.update();

  } else {
    const daysToDisplay = values.length - amountOfDays;
    chart.data.labels = labels.slice(daysToDisplay);
    chart.data.datasets[0].data = values.slice(daysToDisplay);
    chartCases.data.datasets[0].data = casesvalues.slice(daysToDisplay);
    chartCases.data.labels = casesLabels.slice(daysToDisplay);
    testCases.data.datasets[0].data = testsvalues.slice(daysToDisplay);
    testCases.data.labels = testsLabels.slice(daysToDisplay);
    hospCases.data.datasets[0].data = hospvalues.slice(daysToDisplay);
    hospCases.data.labels = hospLabels.slice(daysToDisplay);

    chart.update();
    chartCases.update();
    testCases.update();
    hospCases.update();

  }
});

function displayStateResults(stateData) {
  let fullDate = [];
  let fullDeath = [];
  let fullCases = [];
  let fullTests = [];
  let fullHosp = [];

  for (let i = 0; i < stateData.length; i++) {
    var date = stateData[i].date;
    var death = stateData[i].death;
    var positive = stateData[i].positive;
    var test = stateData[i].totalTestResultsIncrease;
    var hosp = stateData[i].hospitalized;
    fullDate[i] = date;
    fullDeath[i] = death;
    fullCases[i] = positive;
    fullTests[i] = test;
    fullHosp[i] = hosp;
}

return {
    fullDate: fullDate,
    fullDeath: fullDeath,
    fullCases: fullCases,
    fullTests: fullTests,
    fullHosp: fullHosp,
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
          label: "# ",
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
