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
let startDate = "";
$("#start").on('change', function (e) {
  startDate = e.target.value
})

let endDate = "";
$("#end").on('change', function (e) {
  endDate = e.target.value
  getStatesResults(state);
})


let state = "";
$("#states").on('change', function (e) {
  state = states_array[e.target.value]
  getStatesResults(state);
  
})


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
      
    });
}


// Assign Event listener to the day toggler buttons
$("#day-toggle").on("click", "button", function (e) {
  const amountOfDays = $(this).val();
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
  let count = 0;
  
  for (let i = 0; i < stateData.length; i++) {

    
    var date = stateData[i].date;
        date = luxon.DateTime.fromISO(date).toFormat('yyyy-LL-dd');
     if (startDate <= date && endDate >= date) {
       
       var death = stateData[i].death;
       var positive = stateData[i].positive;
       var test = stateData[i].totalTestResultsIncrease;
       var hosp = stateData[i].hospitalized;
       fullDate[count] = date;
       fullDeath[count] = Math.abs(death);
       fullCases[count] = Math.abs(positive);
       fullTests[count] = Math.abs(test);
       fullHosp[count] = Math.abs(hosp);
       count++;
      } 
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
  var ctx = chartElement.getContext("2d");

// Create gradient
var grd = ctx.createLinearGradient(200, 200, 300, 0);
grd.addColorStop(0, "green");
grd.addColorStop(.5, "yellow");
grd.addColorStop(1, "red");
Chart.defaults.global.defaultFontColor = 'blue';

  return new Chart(chartElement, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: grd,
          borderColor: [
          ],
          pointHoverBackgroundColor: 'blue', 
           
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontcolor: "rgba(255, 0, 0, 1)",
            },
          },
        ],
      },
    },
  });
}
