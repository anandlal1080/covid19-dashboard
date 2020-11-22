const countryApi = {
    base: "https://api.covid19api.com/total/country/",
   
  };
  

  // Global variable to store all data related to our charts
  const charts2 = {
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
    recovered: {
      labels: [],
      values: [],
      chart: {},
    
     
    },
    active: {
      labels: [],
      values: [],
      chart: {},
     
     
    },
  };
  
  // Build and assign a reference to each chart
  charts2.deaths.chart = buildChart(document.getElementById("ww-deaths-chart"));
  charts2.cases.chart = buildChart(document.getElementById("ww-cases-chart"));
  charts2.recovered.chart = buildChart(document.getElementById("ww-tests-chart"));
  charts2.active.chart = buildChart(
    document.getElementById("ww-hospitalization-chart")
  );
  // Initialized the Global variable country to a default - United States
  let country = "united-states";
// This will set the country variable to waht was selected on the dropdown list and plot the graphs.
  $("#countries").on('change', function (e) {
    country = e.target.value
    getCountryResults(country, cStartDate, cEndDate);
    
  })
// This initialises the country start date and then sets it to what was slected on the calender.
  let cStartDate = "2020-03-01";
  $("#country-start").on('change', function (e) {
    cStartDate = e.target.value
  })
  // This initialises the country end date and then sets it to what was slected on the calender.
  // Then plots the graphs.
  let cEndDate = luxon.DateTime.local().toISODate();
  $("#country-end").on('change', function (e) {
    cEndDate = e.target.value
    getCountryResults(country, cStartDate, cEndDate);
  })



//  This plots the graphs on initial page load with the default values for country, cstart and cend dates.
  getCountryResults(country, cStartDate, cEndDate);

  
  // Request Covid data based off of our country and plots charts
  function getCountryResults(country, cStartDate, cEndDate) {
    fetch(`${countryApi.base}${country}?from=${cStartDate}T00:00:00Z&to=${cEndDate}T00:00:00Z`)
      .then((countryData) => countryData.json())
      .then((data) => {
        
         
        // sanitize our results
        
        const results = sanitizeCountryResults(data);
        const chart = charts2.deaths.chart;
        charts2.deaths.labels = results.fullDate;
        charts2.deaths.values = results.fullDeath;
        
        chart.data.labels = charts2.deaths.labels;
        chart.data.datasets[0].data = charts2.deaths.values;
        
       
        
        const chartCases = charts2.cases.chart;
        charts2.cases.labels = results.fullDate;
        charts2.cases.values = results.fullConfirm;
        
        chartCases.data.labels = charts2.cases.labels;
        chartCases.data.datasets[0].data = charts2.cases.values;
        
        
  
        const testCases = charts2.recovered.chart;
        charts2.recovered.labels = results.fullDate;
        charts2.recovered.values = results.fullRcov;
        
        testCases.data.labels = charts2.recovered.labels;
        testCases.data.datasets[0].data = charts2.recovered.values;
        
      
  
        const hospCases = charts2.active.chart;
        charts2.active.labels = results.fullDate;
        charts2.active.values = results.fullActive;
        
        hospCases.data.labels = charts2.active.labels;
        hospCases.data.datasets[0].data = charts2.active.values;
       
       
  
        chart.update();
        chartCases.update();
        testCases.update();
        hospCases.update();
        
      });
  }
  
  
  // Assign Event listener to the day toggler buttons
  $("#ww-toggle").on("click", "button", function (e) {
    const amountOfDays = $(this).val();
    
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
  
  // This function takes the data that was returned from the API call and places it into the various variables
  // that are used to plot the graphs.
  function sanitizeCountryResults(countryData) {
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
  
  
  

  