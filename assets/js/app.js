$(document).foundation();

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

fetch("https://api.covid19api.com/countries")
  .then((data) => data.json())
  .then(function (countries) {
    countries.forEach(function ({ Slug, Country }) {
      $("#countries").append($("<option></option>").val(Slug).html(Country));
    });
  });

// fetch("https://api.covidtracking.com/v1/states/")
//   .then((data) => data.json())
//   .then(function (states) {
//     console.log(states);
//   });

states_array.forEach(function (state) {
  // $("#states").append($("<option></option>").val(val).html(text));
});
