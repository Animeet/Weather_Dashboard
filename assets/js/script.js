/*
GIVEN a weather dashboard with form inputs

WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/


// api key???
var apiKey = "55c390308c1632892b0e2d6d9e50f29d"

//variables for misc
var weatherIcon = document.querySelector("#weather-icon");
var searchForm = document.querySelector("#search-form");
var citySearch = document.querySelector("#city-search");

//variables for current data
var currentHeading = document.querySelector("#current-heading");
var currentData = document.querySelector("#current-data");
var currentIcon = document.querySelector("#current-icon");
var clearButton = document.querySelector("#clear-btn");
var searchContainer = document.querySelector("#search-container")
var errorContainer = document.querySelector("#error-container");
var searchWeatherBtn = document.querySelector('#searchWeatherBtn');

//variables for card data
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humid = document.querySelector("#humid");



// * * * Get Current Weather Information * * * //
async function getCurrentWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=55c390308c1632892b0e2d6d9e50f29d')
        .then(
            function (response) {
                alert(response.status);
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(response);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

searchWeatherBtn.addEventListener('click', getCurrentWeather);

// * * * Display Current Weather Information * * * //
function displayCurrentWeather() {
    var data = getCurrentWeather();
    json.loads(data);

    temp.innerHTML = data['main']['temp']
    wind.innerHTML = data['wind']['speed']
    humid.innerHTML = data['main']['humidity']
}


// * * * Get Forecast Weather Information * * * //
async function getForecast() {
    fetch('https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&appid=55c390308c1632892b0e2d6d9e50f29d')
        .then(
            function (response) {
                alert(response.status);
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(response);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}



// * * * Display Forecast Weather Information * * * //
function displayForecast() {
    var forecast = getForecast();
    json.loads(data);

    temp.innerHTML = data['main']['temp']
    wind.innerHTML = data['wind']['speed']
    humid.innerHTML = data['main']['humidity']
}


// * * * Save Search History * * * //



// * * * Load Search History * * * //
