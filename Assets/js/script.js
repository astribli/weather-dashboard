var loadPage = function () {
    var cityValue = localStorage.getItem("city");

    if (cityValue !== null) {
        cityArray = JSON.parse(cityValue);

        for (i = 0; i < cityArray.length; i++) {
            var searchedCity = cityArray[i];
            addSearchHistoryItem(searchedCity);
        }
    }
}

function addSearchHistoryItem(city) {
    var history = document.createElement("button");
    history.innerHTML = city;
    var searched = document.querySelector("#searched");
    searched.appendChild(history);
    history.addEventListener("click", () => {
        console.log("I was clicked");
        console.log(event.target.textContent);
        searchWeather(event.target.textContent);
    });
}
loadPage();

function addSearchHistory(city) {
    var getCity = localStorage.getItem("city");
    var cityArray = [];

    // if get city is empty, make new array of city
    if (getCity == null) {
        cityArray = [city];
    } else {
        cityArray = JSON.parse(getCity);
        cityArray.push(city);
    }

    // if it's not empty
    var cityString = JSON.stringify(cityArray);

    localStorage.setItem("city", cityString);
}


var date = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(date)

var button = document.querySelector(".btn");

function handleSearchEvent() {
    var input = document.querySelector("input").value;
    console.log(input);
    searchWeather(input);
    addSearchHistory(input);
    addSearchHistoryItem(input);
}

var searchWeather = function (input) {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=imperial&appid=5fbadc263ee1b5151313ef1a2b7ed927')

        .then(function (response1) {
            return response1.json();
        })

        .then(function (response1) {
            console.log(response1);
            var searchedCity = response1.name;

            var city = document.querySelector("#city");
            city.innerHTML = '';
            var cityName = document.createElement("h2");
            cityName.innerHTML = searchedCity;
            city.appendChild(cityName);

            temp = document.querySelector("#temp");
            temp.innerHTML = '';
            var tempVariables = response1.main.temp;
            var tempEl = document.createElement("h4");
            tempEl.innerHTML = "Temperature: " + tempVariables + " F°";
            temp.appendChild(tempEl);

            humidity = document.querySelector("#humidity");
            humidity.innerHTML = '';
            var humidityVariables = response1.main.humidity;
            var humidityEl = document.createElement("h4");
            humidityEl.innerHTML = "Humidity: " + humidityVariables + " %";
            humidity.appendChild(humidityEl);

            wind = document.querySelector("#wind");
            wind.innerHTML = '';
            var windVariables = response1.wind.speed;
            var windEl = document.createElement("h4");
            windEl.innerHTML = "Wind Speed: " + windVariables + " MPH";
            wind.appendChild(windEl);

            var lat = response1.coord.lat;
            var lon = response1.coord.lon;

            fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=5fbadc263ee1b5151313ef1a2b7ed927')
                .then(function (response2) {
                    return response2.json();
                })

                .then(function (response2) {
                    console.log(response2.value);

                    uv = document.querySelector("#uv");
                    uv.innerHTML = '';
                    var uvVariables = response2.value;
                    var uvEl = document.createElement("h4");
                    uvEl.innerHTML = "UV Index: " + uvVariables;
                    uv.appendChild(uvEl);
                });
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&appid=5fbadc263ee1b5151313ef1a2b7ed927')
                .then(function (response3) {
                    return response3.json();
                })

                .then(function (response3) {
                    console.log(response3);

                    var forcast = response3.list[0].weather[0].icon;
                    var forcastEl = document.createElement("img");
                    forcastEl.innerHTML = forcast;
                    fiveDay = document.querySelector("#fiveDay");
                    fiveDay.appendChild(forcastEl);
                });
        });
}

