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
function getCurrentWeather(eventObj) {
    eventObj.preventDefault();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + citySearch.value + '&appid=' + apiKey)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(data);
                    displayCurrentWeather(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

searchForm.addEventListener('submit', getCurrentWeather);



// * * * Display Current Weather Information * * * //
function displayCurrentWeather(data) {

    temp.innerHTML = 'Temp: ' + data['main']['temp'] + " 'F"
    wind.innerHTML = 'Wind: ' + data['wind']['speed'] + ' MPH'
    humid.innerHTML = 'Humidity: ' + data['main']['humidity'] + '%'
    getForecast();
}



// * * * Get Forecast Weather Information * * * //
function getForecast() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch.value + '&appid=' + apiKey)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(data);
                    displayForecast(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}




// * * * Display Forecast Weather Information * * * //
function displayForecast(data) {

    currentHeading.innerHTML = citySearch.value + data.list[0]['dt_txt'].split(' ')[0]

    var forecastDate = document.querySelector('.forecast-date')
    for (var i = 1; i < forecastDate.length; i++) {
        forecastDate.innerHTML = data.list[i]['dt_txt'].split(' ')[0]
    }

    var forecastTemp = document.querySelector('.forecast-temp')
    for (var i = 0; i < forecastTemp.length; i++) {
        forecastTemp.innerHTML = data.list[i]['main']['temp']
    }

    var forecastWind = document.querySelector('.forecast-wind')
    for (var i = 0; i < forecastWind.length; i++) {
        forecastWind.innerHTML = data.list[i]['wind']['speed']
    }

    var forecastHumid = document.querySelector('.forecast-humid')
    for (var i = 0; i < forecastHumid.length; i++) {
        forecastHumid.innerHTML = data.list[i]['main']['humidity']
    }
    
}



// * * * Save Search History * * * //




// * * * Load Search History * * * //
