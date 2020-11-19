const countryApi = {
    base: "https://api.covid19api.com/total/country/",
   
  };
  

  // Global variable to store all data related to our charts
  const charts2 = {
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
      label: "Total # of Cases",
      
    },
    recovered: {
      labels: [],
      values: [],
      chart: {},
      label: "# of Recovered",
     
    },
    active: {
      labels: [],
      values: [],
      chart: {},
      label: "# of Active Cases",
     
    },
  };
  
  // Build and assign a reference to each chart
  charts2.deaths.chart = buildChart(document.getElementById("ww-deaths-chart"));
  charts2.cases.chart = buildChart(document.getElementById("ww-cases-chart"));
  charts2.recovered.chart = buildChart(document.getElementById("ww-tests-chart"));
  charts2.active.chart = buildChart(
    document.getElementById("ww-hospitalization-chart")
  );
  
  let cStartDate = "2020-08-01";
  let cEndDate = "2020-11-06";
  let country = "canada";
 
  getCountryResults(country, cStartDate, cEndDate);

  
  // Request Covid data based off of our country
  function getCountryResults(country, cStartDate, cEndDate) {
    fetch(`${countryApi.base}${country}?from=${cStartDate}T00:00:00Z&to=${cEndDate}T00:00:00Z`)
      .then((countryData) => countryData.json())
      .then((data) => {
        
          console.log(data);
        // sanitize our results
        // TODO: refactor function name and change how the results are returned
        const results = displayCountryResults(data);
        const chart = charts2.deaths.chart;
        charts2.deaths.labels = results.fullDate;
        charts2.deaths.values = results.fullDeath;
        
        chart.data.labels = charts2.deaths.labels;
        chart.data.datasets[0].data = charts2.deaths.values;
        chart.data.datasets[0].label = charts2.deaths.label;
       
        
        const chartCases = charts2.cases.chart;
        charts2.cases.labels = results.fullDate;
        charts2.cases.values = results.fullConfirm;
        
        chartCases.data.labels = charts2.cases.labels;
        chartCases.data.datasets[0].data = charts2.cases.values;
        chartCases.data.datasets[0].label = charts2.cases.label;
        
  
        const testCases = charts2.recovered.chart;
        charts2.recovered.labels = results.fullDate;
        charts2.recovered.values = results.fullRcov;
        
        testCases.data.labels = charts2.recovered.labels;
        testCases.data.datasets[0].data = charts2.recovered.values;
        testCases.data.datasets[0].label = charts2.recovered.label;
      
  
        const hospCases = charts2.active.chart;
        charts2.active.labels = results.fullDate;
        charts2.active.values = results.fullActive;
        
        hospCases.data.labels = charts2.active.labels;
        hospCases.data.datasets[0].data = charts2.active.values;
        hospCases.data.datasets[0].label = charts2.active.label;
       
  
        chart.update();
        chartCases.update();
        testCases.update();
        hospCases.update();
        
      });
  }
  
  
  // Assign Event listener to the day toggler buttons
  $("#ww-toggle").on("click", "button", function (e) {
    const amountOfDays = $(this).val();
    console.log(amountOfDays);
    const values = charts2.deaths.values;
    const casesvalues = charts2.cases.values;
    const casesLabels = charts2.cases.labels;
    const testsvalues = charts2.recovered.values;
    const testsLabels = charts2.recovered.labels;
    const labels = charts2.deaths.labels;
    const chart = charts2.deaths.chart;
    const chartCases = charts2.cases.chart;
    const testCases = charts2.recovered.chart;
    const hospCases = charts2.active.chart;
    const hospvalues = charts2.active.values;
    const hospLabels = charts2.active.labels;
  
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
  
  function displayCountryResults(countryData) {
    let fullDate = [];
    let fullDeath = [];
    let fullConfirm = [];
    let fullRcov = [];
    let fullActive = [];
  
    for (let i = 0; i < countryData.length; i++) {
      var date = countryData[i].Date;
        date = date.split("T");
        date = date[0];
      var death = countryData[i].Deaths;
      var confirm = countryData[i].Confirmed;
      var recov = countryData[i].Recovered;
      var active = countryData[i].Active;
      fullDate[i] = date;
      fullDeath[i] = death;
      fullConfirm[i] = confirm;
      fullRcov[i] = recov;
      fullActive[i] = active;
      
  }
  
  return {
      fullDate: fullDate,
      fullDeath: fullDeath,
      fullConfirm: fullConfirm,
      fullRcov: fullRcov,
      fullActive: fullActive,
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
    return new Chart(chartElement, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "# ",
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
  