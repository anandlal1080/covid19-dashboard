// CSS Framework Application
$(document).foundation();

const countryApi = {
    base: "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/"

}


const stateApi = {
    base: "https://api.covidtracking.com/v1/states/"

}

let startDate = "2020-11-01";
let endDate = "2020-11-06";
let state = "CO";
getCountryResults(startDate,endDate);
getStatesResults(state);
function getCountryResults(startDate, endDate) {
    fetch(`${countryApi.base}${startDate}/${endDate}`)
    .then(countryData => {
        return countryData.json();
        
        
        
    }).then(displayResults)
}


function getStatesResults(state) {
    fetch(`${stateApi.base}${state}/daily.json`)
    .then(stateData => {
        return stateData.json();
        
        
        
    }).then(displayStateResults)
    
}





function displayResults(countryData) {
    
    console.log(countryData);
}

function displayStateResults(stateData) {
    
    console.log(stateData);
}