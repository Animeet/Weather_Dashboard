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


// * * * Get Current Weather Information * * * //
function getCurrentWeather(eventObj) {
    eventObj.preventDefault();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + citySearch.value + '&units=imperial&appid=' + apiKey)
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
    var temp = document.querySelector("#temp");
    var wind = document.querySelector("#wind");
    var humid = document.querySelector("#humid");
    var cityName = document.querySelector('#city-name');

    var unixTimestamp = data.dt;
    var date = new Date(unixTimestamp * 1000);
    var months =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var date = date.getDate();
    var formatTime = month + ' ' + date + ', ' + year;


    cityName.textContent = data.name + ' (' + formatTime + ')';
    temp.textContent = 'Temp: ' + data.main.temp + " 'F";
    wind.textContent = 'Wind: ' + data.wind.speed + ' mph';
    humid.textContent = 'Humidity: ' + data.main.humidity + '%';
    getForecast();
}



// * * * Get Forecast Weather Information * * * //
function getForecast() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch.value + '&units=imperial&appid=' + apiKey)
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
    var forecastData = [data.list[5], data.list[13], data.list[22], data.list[30], data.list[38]]

    // currentHeading.innerHTML = citySearch.value + ' (' + data.list[0]['dt_txt'].split(' ')[0] + ')'
    document.getElementById('forcastContainer').innerHTML = ''

    for (var i = 0; i < forecastData.length; i++) {

        // create
        var section = document.createElement('section')
        var fiveDayDate = document.createElement('h5')
        var fiveDayImg = document.createElement('img')
        var fiveDayTemp = document.createElement('p')
        var fiveDayWind = document.createElement('p')
        var fiveDayHumid = document.createElement('p')


        // add
        section.setAttribute('class', 'text-center col-2 m-2 p-0 border border-primary')
        fiveDayDate.textContent = forecastData[i].dt_txt.split(' ')[0]
        fiveDayImg.setAttribute('src', 'http://openweathermap.org/img/w/' + forecastData[i].weather[0].icon + '.png')
        fiveDayTemp.textContent = 'Temp: ' + forecastData[i].main.temp + " 'F"
        fiveDayWind.textContent = 'Wind: ' + forecastData[i].wind.speed + ' mph'
        fiveDayHumid.textContent = 'Humidity: ' + forecastData[i].main.humidity + '%'

        // append
        section.append(fiveDayDate, fiveDayImg, fiveDayTemp, fiveDayWind, fiveDayHumid)
        document.getElementById('forcastContainer').append(section)
    }
}


// * * * Save Search History * * * //




// * * * Load Search History * * * //