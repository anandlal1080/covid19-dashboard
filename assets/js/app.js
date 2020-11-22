$(document).foundation();

// This is the array of states to be used on the dropdown list
const states_array = [
  "AK",
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VI",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
];
// This creates the dropdown list using the array above
$.each(states_array, function(val, text) {
  $('#states').append( $('<option></option>').val(val).html(text) )
  });
// This fetch is to retun the list of countries from the API and thn display it on the dropdown list.
fetch("https://api.covid19api.com/countries")
  .then((data) => data.json())
  .then(function (countries) {
    countries.sort(function (a, b) {
        const aName = a.Country.toUpperCase();
        const bName = b.Country.toUpperCase();
        if (aName < bName) {
          return -1;
        }
        if (aName > bName) {
          return 1;
        }
        return 0;
    })
    .forEach(function ({ Slug, Country }) {
      $("#countries").append($("<option></option>").val(Slug).html(Country));
    });
  });


