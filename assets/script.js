const countryApi = {
    base: "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/"

}


const stateApi = {
    base: "https://api.covidtracking.com/v1/states/"

}

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


function getStatesResults(state) {
    fetch(`${stateApi.base}${state}/daily.json`)
    .then(stateData => {
        return stateData.json();
        
        
        
    }).then(data => displayStateResults(data.reverse()))
    
}





// function displayResults(countryData) {
    
//     // console.log(countryData);
// }

function displayStateResults(stateData) {
    
    console.log(stateData);
    // console.log(stateData[0].lastUpdateEt)
    let fullDate = [];
    let = fullDeath = [];
    for (let i = 200; i < stateData.length; i++) {
        var date = (stateData[i].date);
        var death = (stateData[i].death);
            fullDate[i] = date;
            fullDeath[i] = death;
            
            



            
            
        }
        // console.log(fullDeath);
        // console.log(fullDate);
        // fullDate.sort((a, b) => b.date - a.date);
        // labelDate = [];
        // for (let i = 0; i < fullDate.length; i++) {
        //     labelDate[i] = fullDate[i][0];
            
        // }
        // console.log(labelDate);



// function displayStateCharts(stateData) {
    
    
    var ctx = document.getElementById('myChart1');
    var myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
          labels: fullDate,
          datasets: [{
              label: '# of Deaths',
              data: fullDeath,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
              
          }
      }
  });

 }
  var ctx2 = document.getElementById('myChart2');
  var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Tests',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var ctx3 = document.getElementById('myChart3');
var myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Hospitalizations',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var ctx4 = document.getElementById('myChart4');
var myChart4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Cases',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  
  


