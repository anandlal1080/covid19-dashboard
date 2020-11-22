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

pageLoad();
// Initialized the startDate variable nad then sets it from the calendar
let startDate = "";
$("#start").on('change', function (e) {
  startDate = e.target.value
})

// Initialized the endDate variable nad then sets it from the calendar
let endDate = "";
$("#end").on('change', function (e) {
  endDate = e.target.value
  getStatesResults(state);
})

// Initialized the state variable nad then sets it from the state dropdown
let state = "";
$("#states").on('change', function (e) {
  state = states_array[e.target.value]
  getStatesResults(state);
  
})

// This function activates on page load. It will get the user's location using their IP address.
// It will them compare that to a txt file to get the state abbreviation.
// Then it will call the getStatesResults() function to display graphs for the user's State
function pageLoad() {
  fetch('https://extreme-ip-lookup.com/json/')
.then( res => res.json())
.then(response => {
  $(document).ready(function() {

    $.ajax({
    
    type: "GET",
    
    url: "./assets/us_states.csv",
    
    dataType: "text",
    
    success: function(data) {processData(data);}
    
    });
    
    });
    
    function processData(allText) {
    
    var allTextLines = allText.split(/\r\n|\n/);
    
    var headers = allTextLines[0].split(',');
    
    var lines = [];
    
    for (var i=1; i<allTextLines.length; i++) {
    
    var data = allTextLines[i].split(',');
    
    if (data.length == headers.length) {
    
    var tarr = [];
    
    for (var j=0; j<headers.length; j++) {
    
    tarr.push(headers[j],data[j]);
    
    }
    
    lines.push(tarr);
    
    }
    
    }
  
    for (let i = 0; i < (lines[0].length)-1; i++) {
      
      
      if (lines[0][i] == response.region) {
        state = lines[0][i+1]
      }
      
    }
    startDate = "2020-03-05";
    endDate = luxon.DateTime.local().toISODate();
    getStatesResults(state)
    
  }
 })
  
}

// This function does the API call for a specific state. It will retun the values to be sanitized
// and then used to display charts.
function getStatesResults(state) {
  fetch(`${stateApi.base}${state}/daily.json`)
    .then((stateData) => stateData.json())
    .then((data) => {
      // sanitize our results
      // TODO: refactor function name and change how the results are returned
      const results = sanitizeStateResults(data.reverse());
      const chart = charts.deaths.chart;
      charts.deaths.labels = results.fullDate;
      charts.deaths.values = results.fullDeath;
      
      chart.data.labels = charts.deaths.labels;
      chart.data.datasets[0].data = charts.deaths.values;
      
      
      
      const chartCases = charts.cases.chart;
      charts.cases.labels = results.fullDate;
      charts.cases.values = results.fullCases;
      
      chartCases.data.labels = charts.cases.labels;
      chartCases.data.datasets[0].data = charts.cases.values;
      
     

      const testCases = charts.tests.chart;
      charts.tests.labels = results.fullDate;
      charts.tests.values = results.fullTests;
      
      testCases.data.labels = charts.tests.labels;
      testCases.data.datasets[0].data = charts.tests.values;
      
     

      const hospCases = charts.hospitalization.chart;
      charts.hospitalization.labels = results.fullDate;
      charts.hospitalization.values = results.fullHosp;
      
      hospCases.data.labels = charts.hospitalization.labels;
      hospCases.data.datasets[0].data = charts.hospitalization.values;
      
     

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


// This function takes the data that was returned from the API call and places it into the various variables
// that are used to plot the graphs.
function sanitizeStateResults(stateData) {
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
